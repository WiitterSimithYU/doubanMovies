<template>
    <div class="scroll-wrapper">
        <div class="scroll" ref="listWrapper">
            <ul>
                <douban-item :item="item" v-for="(item, index) in list.subjects" :key="index"></douban-item>
                <li class="loading" v-if="loading_show">
                    <div class="icon rotate">
                        <i class="icon-loading"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import doubanItem from '../../components/item/item'
export default {
    data() {
        return {
            index: null,
            list: {},
            count: 11,
            start: 0,
            // ----------            
            whetherScroll: true, // 控制滚动事件是否触发
            scrollY: 0,          // Y轴滚动的距离
            scrollHeight: 0,     // 滚动页面的高度
            loading_show: false  // loading 是否显示
        }
    },
    computed: {
        // 页面滚动的距离，和页面的高度的差值
        // 如果这个差值大于0，就说明页面到底了
        diffScroll() {
            return this.scrollY - this.scrollHeight;
        }
    },
    components: {
        doubanItem
    },
    created() {
        let index = this.$route.params.index;
        this.index = index;

        this.loading_show = !this.loading_show;

        switch (index) {
            case 0:
                this.http(this.$api.coming_soon); // 即将上映
                break;
            case 1:
                this.http(this.$api.in_theaters); // 正在热映
                break;
            case 2:
                this.http(this.$api.top250)       // top250
                break;
        }
    },
    methods: {
        /**
         * http
         * @param [path] 地址
         * @param [type] 
         * ********  0: 即将上映 
         * ********  1: 正在热映
         * ********  2: top250
         */
        http(path, type) {
            let self = this;
            $.ajax({
                type: 'get',
                dataType: 'jsonp',
                url: this.$api.hostname + path,
                data: {
                    count: this.count,
                    start: this.start
                },
                success: function (res) {
                    if (res) {
                        self.loading_show = !self.loading_show;

                        self.whetherScroll = true;

                        // 如果 start 为0，说明页面第一次加载，
                        // list 就等于 res。
                        // 如果 start 不为0，说明页面已经初始化，
                        // 将请求到的新数据 push 给 list
                        if (self.start === 0) {
                            self.list = res;
                        } else {
                            for (let i = 0; i < res.subjects.length; i++) {
                                self.list.subjects.push(res.subjects[i])
                            }
                        }

                        self.start += self.count;

                        // 同样，页面第一次请求，初始化 better scroll
                        // 下拉刷新，则强制刷新滚动器，重新计算容器高度
                        self.$nextTick(() => {
                            if (self.start === self.count) {
                                self.initScroll()
                            } else {
                                self.listScroll.refresh()
                            }
                        });
                    }
                },
                error: function (err) {
                    self.loading_show = !self.loading_show;
                    alert(err.status)
                }
            })
        },
        initScroll() {
            this.listScroll = new BScroll(this.$refs.listWrapper, {
                // @param [click]
                // better-scroll 会 prevent 一些默认事件，
                // 这里允许点击事件的发生
                // @param [probeType]
                // {1} 滚动的时候会派发scroll事件，会截流。
                // {2} 滚动的时候实时派发scroll事件，不会截流。 
                // {3} 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
                probeType: 3,
                click: true
            });

            this.listScroll.on('scroll', (pos) => {
                // 将值转换为 整数，并取他的绝对值
                this.scrollY = Math.abs(Math.round(pos.y));

                // 动态计算滚动页面的高度
                let ulHeight = document.getElementsByTagName('ul')[0].clientHeight,
                    bodyHeight = document.documentElement.clientHeight,
                    headerHeight = document.getElementsByTagName('header')[0].clientHeight;
                this.scrollHeight = ulHeight - bodyHeight + headerHeight;

                // 页面滚动到底部后发起请求
                if (this.diffScroll > 50 && this.whetherScroll) {
                    this.loading_show = !this.loading_show;
                    switch (this.index) {
                        case 0:
                            this.http(this.$api.coming_soon); // 即将上映
                            break;
                        case 1:
                            this.http(this.$api.in_theaters); // 正在热映
                            break;
                        case 2:
                            this.http(this.$api.top250)       // top250
                            break;
                    };

                    // 请求后，关闭滚动事件触发
                    this.whetherScroll = false;
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/sass/_base.scss';
.scroll-wrapper {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: hidden;
    .scroll {
        height: 100%;
        ul {
            display: flex;
            flex-wrap: wrap;
            .item {
                margin-top: .24rem;
                margin-left: .3rem;
            }
            li:last-of-type {
                margin-bottom: 2rem;
            }
            .loading {
                width: 100%;
                height: .88rem;
                @include flex-center();
                .icon {
                    width: .55rem;
                    height: .55rem;
                    @include flex-center();
                    i {
                        font-size: .48rem;
                        color: $green;
                    }
                }
            }
        }
    }
}
</style>
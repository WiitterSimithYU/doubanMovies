<template>
    <div class="scroll-wrap">
        <div class="scroll"
             ref="scroll">
            <ul>
                <!--Auth-->
                <div class="auth-wrapper">
                    <div class="auth">
                        <i class="icon-search"></i>
                        <input type="text"
                               placeholder="搜索"
                               v-model="input_val"
                               @keyup.enter="search">
                    </div>
                    <div class="cancel"
                         @click="back">取消</div>
                </div>
                <!--auth-->
    
                <!--Result-->
                <div class="result">
                    <ul>
                        <douban-item-sm v-for="item in list.subjects"
                                        :item="item"
                                        :key="item.id"></douban-item-sm>
                    </ul>
                    <div class="fill"
                         v-show="!recommend_show"></div>
                </div>
                <!--result-->
    
                <!--Recommend-->
                <div class="recommend"
                     v-show="recommend_show">
                    <div class="title">
                        热门搜索
                    </div>
                    <router-link class="item"
                                 v-for="(item, index) in recommend.subjects"
                                 :key="index"
                                 :to="{name: 'detail', params: {'id': item.id, 'title': item.title}}">
                        {{item.title}}
                    </router-link>
                </div>
                <!--recommend-->
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import doubanItemSm from '../../components/item/item-sm'
export default {
    data () {
        return {
            input_val: '',
            list: {},
            history_search: [],
            recommend: {},
            recommend_show: true,
            // ----------
            count: 20,
            start: 0,
            whetherScroll: true, // 控制滚动事件是否触发
            scrollY: 0,          // Y轴滚动的距离
            scrollHeight: 0,     // 滚动页面的高度
        }
    },
    computed: {
        input_val_live () {
            return this.input_val;
        },
        // 页面滚动的距离，和页面的高度的差值
        // 如果这个差值大于0，就说明页面到底了
        diffScroll () {
            return this.scrollY - this.scrollHeight;
        }
    },
    watch: {
        input_val (val) {
            if (!val) {
                this.list = {};
                this.recommend_show = true;
            }
        }
    },
    components: {
        doubanItemSm
    },
    created () {
        // 热门搜索
        let self = this;
        $.ajax({
            type: 'get',
            dataType: 'jsonp',
            url: this.$api.hostname + this.$api.in_theaters,
            data: {
                count: 5
            },
            success: function (res) {
                if (res) {
                    self.recommend = res;
                }
            },
            error: function (err) {
                alert(err.status)
            }
        })
    },
    methods: {
        search () {
            if (this.input_val) {
                let self = this;
                this.recommend_show = false;
                this.$store.commit('headerLoadingShow');

                $.ajax({
                    type: 'get',
                    dataType: 'jsonp',
                    url: this.$api.hostname + this.$api.search,
                    data: {
                        q: this.input_val,
                        start: this.start,
                        count: this.count
                    },
                    success: function (res) {
                        if (res) {
                            self.whetherScroll = true;
                            self.$store.commit('headerLoadingShow');

                            if (self.start === 0) {
                                self.list = res;
                            } else {
                                for (let i = 0; i < res.subjects.length; i++) {
                                    self.list.subjects.push(res.subjects[i])
                                }
                            };

                            self.start += self.count;

                            // 同样，页面第一次请求，初始化 better scroll
                            // 下拉刷新，则强制刷新滚动器，重新计算容器高度
                            self.$nextTick(() => {
                                if (self.start == self.count) {
                                    self.initScroll()
                                } else {
                                    self.listScroll.refresh()
                                }
                            });
                        }
                    },
                    error: function (err) {
                        self.$store.commit('headerLoadingShow');
                        console.log(err.status)
                    }
                })
            }
        },
        back () {
            this.$router.go(-1)
        },
        initScroll () {
            this.listScroll = new BScroll(this.$refs.scroll, {
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

                    this.search()

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
.scroll-wrap {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .scroll {
        height: 100%;
        ul {
            .auth-wrapper {
                width: 100%;
                height: .88rem;
                padding: 0 .16rem;
                box-sizing: border-box;
                background: $green;
                display: flex;
                align-items: center;
                .auth {
                    width: 85%;
                    height: .55rem;
                    border-radius: .08rem;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    i {
                        font-size: .4rem;
                        margin-left: .16rem;
                        color: lighten($content, 10%);
                    }
                    input {
                        flex: 1;
                        margin: 0 .08rem;
                        outline: none;
                    }
                }
                .cancel {
                    display: block;
                    width: 15%;
                    height: .55rem;
                    line-height: .55rem;
                    text-align: center;
                    color: rgba(255, 255, 255, .54);
                }
            }
            .result {
                .fill {
                    width: 100%;
                    height: .88rem;
                }
            }
            .recommend {
                width: 100%;
                .title {
                    padding: .16rem .24rem;
                    box-sizing: border-box;
                    background: lighten($border, 6%);
                    color: lighten($title, 25%);
                }
                .item {
                    display: block;
                    width: 100%;
                    padding: .24rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid $background;
                    color: $title;
                }
            }
        }
    }
}
</style>
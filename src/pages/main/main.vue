<template>
    <div class="main">
        <!--Search-->
        <div class="search">
            <router-link class="wrap" to="/search">
                <i class="icon-search"></i>
                <span>搜索</span>
            </router-link>
        </div>
        <!--search-->
    
        <!--Bar-->
        <div class="bar" v-for="(list, index) in lists">
            <div class="title">
                <span class="text">&nbsp&nbsp{{list.title}}</span>
                <router-link class="more" :to="{name: 'more-' + index, params: {index: index}}">
                    更多<span>&nbsp></span>
                </router-link>
            </div>
            <div class="content-wrapper">
                <ul class="content">
                    <douban-item :item="item" v-for="(item, index) in list.subjects" :key="index"></douban-item>
                </ul>
            </div>
        </div>
        <!--bar-->
    
    </div>
</template>

<script>
import doubanItem from '../../components/item/item'

export default {
    data() {
        return {
            lists: []
        }
    },
    components: {
        doubanItem
    },
    created() {
        this.$store.commit('headerLoadingShow');

        this.http(this.$api.coming_soon, 0); // 即将上映
        this.http(this.$api.in_theaters, 1); // 正在热映
        this.http(this.$api.top250, 2)       // top250
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
                    count: 10
                },
                success: function (res) {
                    if (res) {
                        self.$store.commit('headerLoadingShow');
                        self.$set(self.lists, type, res)
                    }
                },
                error: function (err) {
                    self.$store.commit('headerLoadingShow');
                    alert(err.status)
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/sass/_base.scss';
.main {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: $background;
    .search {
        width: 100%;
        height: .88rem;
        background: $green;
        @include flex-center();
        .wrap {
            display: block;
            width: 92%;
            height: .55rem;
            line-height: .55rem;
            text-align: center;
            background: #fff;
            border-radius: .08rem;
            i {
                color: lighten($content, 10%);
                vertical-align: -10%;
            }
            span {
                color: lighten($content, 20%);
            }
        }
    }
    .bar {
        width: 100%;
        background: #fff;
        margin-bottom: .32rem;
        .title {
            position: relative;
            height: .88rem;
            line-height: .88rem;
            &:before {
                display: block;
                content: '';
                width: .04rem;
                height: 40%;
                position: absolute;
                top: 50%;
                transform: translate3d(0, -50%, 0);
                background: $green;
            }
            .text {
                color: $title;
                font-weight: 700;
            }
            .more {
                color: $green;
                float: right;
                margin-right: .32rem;
                font-size: .24rem;
                span {
                    color: $border;
                }
            }
        }
        .content-wrapper {
            width: 100%;
            height: 3.8rem;
            padding: 0 .25rem;
            margin-top: .24rem;
            box-sizing: border-box;
            overflow: hidden;
            .content {
                width: 100%;
                height: 5rem;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                display: flex;
                flex-wrap: nowrap;
                .item {
                    margin-left: .24rem;
                    &:first-child {
                        margin-left: 0;
                    }
                }
            }
        }
    }
}
</style>
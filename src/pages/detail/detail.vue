<template>
    <div class="detail">
        <!--Header-->
        <header :style="{backgroundImage: 'url(' + list.images.large + ')'}">
            <div class="content">
                <!--img-->
                <div class="img">
                    <img :src="list.images.medium" alt="">
                </div>
    
                <!--info-->
                <div class="info">
                    <h1 class="title">
                                    <span class="ch-title">{{list.title}}</span><br>
                                    <span class="en-title">{{list.original_title}}</span>
                                </h1>
                    <div class="ratings">
                        <div class="average">{{list.rating.average}}</div>
                        <div class="star-wrapper">
                            <douban-star :size="24" :score="list.rating.stars"></douban-star>
                            <p class="comment-count">{{list.ratings_count}}人评价</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!--header-->
    
        <!--Detail Info-->
        <div class="detail-info">
            <!--genres-->
            <p class="genres">
                <span v-for="item in list.genres">{{item}}</span>
            </p>
    
            <!--countries-->
            <p class="countries">
                <!--time-->
                <span>{{list.year}}</span>
                <span v-for="item in list.countries">{{item}}</span>
            </p>
    
            <!--directors-->
            <p class="directors">
                导演：<span v-for="item in list.directors">{{item.name}}</span>
            </p>
    
            <!--casts-->
            <p class="casts">
                演员：<span v-for="item in list.casts">{{item.name}}</span>
            </p>
        </div>
        <!--detail info-->
    
        <!--Summary-->
        <div class="summary">
            <h1 class="title">{{list.title}}的剧情简介</h1>
            <div class="content">
                {{list.summary}}
            </div>
        </div>
        <!--summary-->
    
        <!--Comment-->
        <div class="comment">
            <h1 class="title">短评({{list.comments_count}})</h1>
            <p>未开放权限😢</p>
        </div>
        <!--comment-->
    </div>
</template>

<script>
import doubanStar from '../../components/star/star'
export default {
    data() {
        return {
            id: '',
            list: {},
            comment: {}
        }
    },
    components: {
        doubanStar
    },
    created() {
        this.id = this.$route.params.id;
        this.$store.commit('loadingShow');

        let self = this;
        // ajax info
        $.ajax({
            type: 'get',
            dataType: 'jsonp',
            url: this.$api.hostname + this.$api.subject + this.id,
            success: function (res) {
                if (res) {
                    self.$store.commit('loadingShow');
                    self.list = res;
                }
            },
            error: function (err) {
                self.$store.commit('loadingShow');
                alert(err.status)
            }
        })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/sass/_base.scss';
.detail {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    header {
        position: relative;
        width: 100%;
        height: 3rem;
        padding: .24rem;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-position: left top;
        background-size: cover;
        &:after {
            display: block;
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            background: rgba(0, 0, 0, .72);
        }
        .content {
            margin-top: .54rem;
            display: flex;
            .img {
                z-index: 1;
            }
            .info {
                z-index: 1;
                flex: 1;
                margin-left: .24rem;
                margin-top: .32rem;
                .title {
                    font-size: .38rem;
                    font-weight: 0;
                    line-height: .45rem;
                    color: #fff;
                    .ch-title {}
                    .en-title {
                        font-size: .32rem;
                    }
                }
                .ratings {
                    display: flex;
                    align-items: center;
                    margin-top: .32rem;
                    .average {
                        font-size: .54rem;
                        color: #fff;
                        margin-right: .16rem;
                    }
                    .star-wrapper {
                        .comment-count {
                            font-size: .24rem;
                            margin-top: .08rem;
                            color: rgba(255, 255, 255, .54);
                        }
                    }
                }
            }
        }
    }
    .detail-info {
        padding: 0 .24rem;
        margin-top: .89rem;
        box-sizing: border-box;
        line-height: .48rem;
        font-size: .26rem;
        .genres,
        .countries,
        .directors,
        .casts {
            span:before {
                content: '/';
                padding: 0 .08rem;
            }
            span:first-of-type:before {
                content: ''
            }
        }
    }
    .summary {
        width: 100%;
        margin-top: .32rem;
        padding: 0 .24rem;
        box-sizing: border-box;
        .title {
            color: darken($border, 5%);
        }
        .content {
            margin-top: .24rem;
            line-height: .48rem;
            font-size: .26rem;
            color: $title;
        }
    }
    .comment {
        width: 100%;
        margin-top: .32rem;
        padding: 0 .24rem;
        box-sizing: border-box;
        .title {
            color: darken($border, 5%);
        }
        p {
            margin-top: .24rem;
        }
    }
}
</style>
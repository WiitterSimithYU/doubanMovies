<template>
    <li class="item">
        <router-link :to="{name: 'detail', params: {'id': item.id, 'title': item.title}}">
            <div class="img">
                <img :src="item.images.medium" alt="">
            </div>
            <h1>{{item.title}}</h1>
            <!--Star-->
            <div class="star-wrapper" v-if="item.rating.stars != '00'">
                <!--@params [size] 24, 36, 48-->
                <douban-star :size="24" :score="item.rating.stars"></douban-star>
                <span class="average">{{item.rating.average}}</span>
            </div>
            <div class="star-wrapper" v-else>
                <p class="norating">暂无评论</p>
            </div>
            <!--star-->
        </router-link>
    </li>
</template>

<script>
import doubanStar from '../star/star'
export default {
    props: {
        item: {
            type: Object
        }
    },
    components: {
        doubanStar
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/sass/_base.scss';
.item {
    width: 2rem;
    a {
        display: block;
        .img {
            background: $background;
            img {
                width: 2rem;
                height: 2.66rem;
            }
        }
        h1 {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: $title;
            font-size: .24rem;
            font-weight: 700;
            margin-top: .16rem;
        }
        .star-wrapper {
            margin-top: .16rem;
            display: flex;
            .average {
                font-size: .22rem;
            }
            .norating {
                width: 100%;
                font-size: .2rem;
            }
        }
    }
}
</style>
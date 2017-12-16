<template>
    <li class="item">
        <router-link :to="{name: 'detail', params: {'id': item.id, 'title': item.title}}">
            <div class="img">
                <img :src="item.images.small" alt="">
            </div>
            <div class="info">
                <h1 class="title">{{item.title}}</h1>
                <douban-star :size="24" :score="item.rating.stars"></douban-star>
                <p class="rating">
                    <span class="average">{{item.rating.average}}分/</span>
                    <span class="time">{{item.year}}</span>
                </p>
            </div>
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
    border-bottom: 1px solid $border;
    &:last-of-type {
        border-bottom: none;
    }
    a {
        width: 100%;
        padding: .24rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .img {
            width: 1.3rem;
            height: 2rem;
            img {
                width: 1.3rem;
                height: 2rem;
            }
        }
        .info {
            flex: 1;
            margin-left: .16rem;
            .title {
                color: $title;
                font-weight: 700;
                margin-bottom: .16rem;
            }
            .star {
                margin-bottom: .16rem;
            }
            .rating {
                font-size: .24rem;
                color: darken($border, 10%);
            }
        }
    }
}
</style>
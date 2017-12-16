<template>
    <header>
        <h1 class="title">
            <span>豆瓣影评</span>
            <div class="icon rotate" v-show="header_loading">
                <i class="icon-loading"></i>
            </div>
        </h1>
        <div class="left" @click="back" v-show="route != 'main'">
            <i class="icon-back"></i>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        route() {
            return this.$route.name
        },
        ...mapState([
            'header_loading'
        ])
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/sass/_base.scss';
header {
    position: relative;
    width: 100%;
    height: .88rem;
    background: $green;
    .title {
        position: relative;
        line-height: .88rem;
        text-align: center;
        font-size: .32rem;
        color: #fff;
        .icon {
            position: absolute;
            top: 50%;
            left: 59%;
            margin: -.24rem 0 0 0;
            width: .48rem;
            height: .48rem;
            vertical-align: middle;
            @include flex-center();
            i {}
        }
    }
    .left,
    .right {
        display: block;
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        width: .66rem;
        height: .66rem;
        line-height: .66rem;
        text-align: center;
        font-size: .32rem;
        color: #fff;
    }
    .left {
        left: .08rem;
    }
    .right {
        right: .08rem;
    }
}
</style>
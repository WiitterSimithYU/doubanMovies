<template>
    <div class="star" :class="sizeClass">
        <span class="star-item" :class="item" v-for="item in itemClass"></span>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 24
        },
        score: {
            type: String,
            default: '00'
        }
    },
    computed: {
        sizeClass() {
            return 'star-' + this.size
        },
        itemClass() {
            let Len = 5,
                result = [],
                ON = 'on',
                OFF = 'off',
                HALF = 'half';

            let integer = this.score.charAt(0) * 1,
                isHalf = this.score.charAt(1) === '5' ? true : false;

            // on
            for (let i = 0; i < integer; i++) {
                result.push(ON)
            }

            // half
            if (isHalf) {
                result.push(HALF)
            }

            // off
            while(result.length < Len) {
                result.push(OFF);
            }

            return result;
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.star {
    width: 100%;
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    $star-map: 24,
    36,
    48;
    @each $star in $star-map {
        &.star-#{$star} {
            .star-item {
                width: #{$star/100}rem;
                height: #{$star/100}rem;
                margin-left: #{$star/400}rem;
                &:first-child {
                    margin-left: 0;
                }
            }
            .on {
                background-image: url(./star#{$star}_on@2x.png)
            }
            .off {
                background-image: url(./star#{$star}_off@2x.png)
            }
            .half {
                background-image: url(./star#{$star}_half@2x.png)
            }
        }
    }
}
</style>
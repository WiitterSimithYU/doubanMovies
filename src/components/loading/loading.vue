<template>
    <div class="loading">
        <div class="icon rotate">
            <i class="icon-loading"></i>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/sass/_base.scss';
.loading {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .54);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    font-size: 0;
    .icon {
        position: relative;
        top: 50%;
        left: 50%;
        width: .88rem;
        height: .88rem;
        margin: -.44rem 0 0 -.44rem;
        @include flex-center();
        i {
            font-size: .68rem;
            color: $green;
        }
    }
}
</style>
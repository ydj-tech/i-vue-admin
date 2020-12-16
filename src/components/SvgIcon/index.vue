<!-- Discription: svg组件, author: ydj, Date: 2020-07-29 20:53:18 -->
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
  overflow : hidden;
  width : 1em;
  height : 1em;
  vertical-align : -.15em;
  fill : currentColor;
  filter : drop-shadow(#FFFFFF 80px 0);
  transform : translateX(-80px);
}


</style>

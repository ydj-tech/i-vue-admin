<!-- Discription: 菜单挂载逻辑, author: ydj, Date: 2020-07-29 19:14:02 -->
<template>
    <div class="menu-container">
        <template v-for="v in menuList">
            <template v-if="!v.hidden">
                <!-- 没有children -->
                <el-menu-item v-if="!v.hasOwnProperty('children')" :key="v.name" :index="v.name" @click="gotoRoute(v.name)">
                    <svg-icon :icon-class="v.meta.icon" />
                    <span slot="title">{{v.meta.title}}</span>
                </el-menu-item>
                <!-- 仅有一个children -->
                <router-link v-else-if="hasOneChild(v.children) && !collapse" :to="resolvePath(onlyOneChild.path)" :key="v.name">
                    <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                        <svg-icon :icon-class="onlyOneChild.meta.icon" />
                        <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{ onlyOneChild.meta.title }}</span>
                    </el-menu-item>
                </router-link>
                <!-- 多个children -->
                <el-submenu v-else :index="v.name" :key="v.name">
                    <template slot="title">
                        <svg-icon :icon-class="v.meta.icon" />
                        <span>{{v.meta.title}}</span>
                    </template>
                    <el-menu-item-group>
                        <my-nav :menuList="v.children"></my-nav>
                    </el-menu-item-group>
                </el-submenu>
            </template>
        </template>
    </div>
</template>

<script>
import path from 'path'
export default {
    name: 'my-nav',
    props: {
        menuList: {
            type: Array,
            default: function () {
                return []
            }
        },
        basePath: {
            type: String,
            default: ''
        },
        isNest: {
            type: Boolean,
            default: false
        },
        collapse: {
            type: Boolean
        }
    },
    methods: {
        gotoRoute(name) {
            console.log('name =', name)
            this.$router.push({ name })
        },
        hasOneChild(children) {
            const showingChildren = children.filter(item => {
                if (item.meta.title === '首页') {
                    this.onlyOneChild = item
                    return true
                } else {
                    return false
                }
            })
            if (showingChildren.length === 1) {
                return true
            }
            return false
        },
        resolvePath(routePath) {
            return path.resolve(this.basePath, routePath)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>

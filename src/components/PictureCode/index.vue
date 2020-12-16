<!-- Discription: 验证码组件, author: ydj, Date: 2020-11-25 15:22:25 -->
 <template>
    <div>
        <div
            :style="{height:(codeHeight-2)+'px'}"
            style="border:1px solid #ddd;border-left:none;width:calc( 100% - 2px );"
            @click="drawCode('')"
            id="code"
            ref="code"
        >
            <canvas
                :height="(codeHeight-2)+'px'"
                id="verifyCanvas"
            ></canvas>
            <img id="code_img">
        </div>
    </div>
</template>
<script>
export default {
    name: 'ValidateCode',
    data() {
        return {
            nums: ['2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            ],
            validateRandomCode: []
        }
    },
    props: {
        codeHeight: {
            type: Number,
            required: true
        }
    },
    created() {
        this.$nextTick(() => {
            this.drawCode('')
        })
    },
    methods: {
        // 验证码
        drawCode(str) {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                document.getElementById('verifyCanvas').removeNode(true)
            } else {
                document.getElementById('verifyCanvas').remove()// 每次更新验证码都要移除canvas，然后再进行重绘
            }
            var box = document.getElementById('code')
            var p1 = document.getElementById('code_img')
            var p0 = document.createElement('canvas')// 创建canvas节点
            p0.id = 'verifyCanvas'// 定义canvas id

            box.insertBefore(p0, p1)// 将canvas节点插入到img节点前面

            this.$nextTick(() => {
                if (this.$refs.code) {
                    p0.width = this.$refs.code.offsetWidth - 3
                    // p0.width = 89// 设置画布宽度
                    p0.height = this.codeHeight - 2// 设置画布高度
                    var canvas = document.getElementById('verifyCanvas') // 获取HTML端画布
                    var context = canvas.getContext('2d') // 获取画布2D上下文环境
                    context.fillStyle = '#fff' // 画布填充色
                    context.fillRect(0, 0, canvas.width, canvas.height) // 清空画布
                    context.fillStyle = '#800000' // 设置字体颜色
                    context.font = '25px Arial' // 设置字体
                    // var rand = new Array();
                    var x = []
                    var y = []
                    for (var i = 0; i < 4; i++) {
                        // rand.push(rand[i]);
                        this.validateRandomCode[i] = this.nums[Math.floor(Math.random() * this.nums.length)]// 在数组中随机取一个值
                        x[i] = p0.width / 4 * i + 5
                        y[i] = Math.random() * this.codeHeight / 4 + this.codeHeight / 2
                        context.fillText(this.validateRandomCode[i], x[i], y[i])// 设置文本在画布中显示的位置
                    }
                    // 画3条随机线
                    for (let i = 0; i < 3; i++) {
                        this.drawline(canvas, context)
                    }

                    // 画30个随机点
                    for (let i = 0; i < 30; i++) {
                        this.drawDot(canvas, context)
                    }
                    this.convertCanvasToImage(canvas)

                    this.$emit('getValidateCode', this.validateRandomCode.join('').toLowerCase())

                    return this.str
                }
            })
        },
        // 随机线
        drawline(canvas, context) {
            context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)) // 随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
            context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)) // 随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
            context.lineWidth = 0.5 // 随机线宽
            context.strokeStyle = 'rgba(50,50,50,0.3)' // 随机线描边属性
            context.stroke() // 描边，即起点描到终点
        },
        // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
        drawDot(canvas, context) {
            var px = Math.floor(Math.random() * canvas.width)
            var py = Math.floor(Math.random() * canvas.height)
            context.moveTo(px, py)
            context.lineTo(px + 1, py + 1)
            context.lineWidth = 0.2
            context.stroke()
        },
        // 绘制图片
        convertCanvasToImage(canvas) {
            document.getElementById('verifyCanvas').style.display = 'none'
            var image = document.getElementById('code_img')
            image.src = canvas.toDataURL('image/png')// 画布转成图片地址
            return image// 返回图片对象
        }
    }
}
</script>
<style scoped>
</style>
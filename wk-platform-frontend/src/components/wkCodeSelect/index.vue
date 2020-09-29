<template>
    <div class="wk-code-select">
        <el-select :disabled="config.disabled" v-model="bind_data.codeName" @focus="getData" @change="changeData" value-key="id" clearable  filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.codeName"
                :value="item"
                :disabled="item.disabled">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: 'wkCodeSelect',
    props: {
        //绑定的数据
        bind_data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        config_parent: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data () {
        return {
            options: [],
            config_default: {
                codeFc: '',//需要查询的后台字段，必填，如：weighType
                microseriveName: '',//微服务名称，必填，如：service
                disabled: false,//整个下拉是否禁用，非必填，默认为不禁用
                disabledList: [],//需要禁用的codeValue,非必填，如：[1,3]
            },
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    computed: {
        //根据父组件的配置+默认配置=总的配置
        config() {
            return Object.assign(this.config_default,this.config_parent);
        }
    },
    methods: {
        /**
         * 获取数据
         */
        getData() {
            this.$fetch(`/${this.config.microseriveName}/sysCode/fc?key=${this.config.codeFc}`).then((response) => {
                this.options = response.data;
                //根据配置中需要禁用的选项，配置禁用
                if(this.config.disabledList && this.config.disabledList.length > 0) {
                    this.config.disabledList.forEach(element => {
                        this.options.forEach(option => {
                            if(element == option.codeValue) {
                                this.$set(option,'disabled',true);
                            }
                        });
                    });
                }
            })
        },
        /**
         * 选中值发生变化时触发
         */
        changeData(val) {
            //向父组件传递选中的数据
            this.$emit('update:bind_data', val ? val : {});
        },
    },
    watch: {
        
    }
}
</script>

<style scoped>
.wk-code-select {
    display: inline-block;
    width: 100%;
}
.wk-code-select >>> .el-select {
    width: 100%;
}
</style>

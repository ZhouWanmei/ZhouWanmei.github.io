<template>
    <div class="wk-dropdown">
        <el-popover
            placement="bottom"
            :width="config.width"
            trigger="click"
            v-model="visible"
            @show="getData">
            <div class="wk-dropdown-btns">
                <el-button size="mini" type="primary" @click="clearData">
                    <i class="el-icon-refresh"></i>
                    <span>清空</span>
                </el-button>
            </div>
            <el-table 
                :data="config.data" 
                :height="config.tableHeight"
                @row-click="dataSelect">
                <template v-for="(col,index) in config.headers">
                    <el-table-column 
                        :prop="col.prop" 
                        :label="col.label" 
                        :key="index">
                    </el-table-column>
                </template>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                :pager-count="5"
                layout="total, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
            <el-input slot="reference" :disabled="config.disabled" v-model="keyWords" @input="getSearchData" :placeholder="config.title"></el-input>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'wkDropdown',
    props: {
        bind_data: {
            type: Object,
            default: () => {
                return {}
            }
        },
        config_parent: {
            type: Object,
            default: () => {
                return {
                    
                }
            }
        }
    },
    data () {
        return {
            visible:false,
            config_default: {
                title: '',//输入框placeholder显示的文字，非必填，如：请选择用户
                disabled: false,//是否禁用，非必填，默认为不禁用
                isDataCache: false,//是否开启数据缓存，默认为：false
                headers: [//弹框中表格的表头，必填(*)
                    // {
                    //     prop: "userName",
                    //     label: "用户名称",
                    //     type: "text",
                    //     align: "center"
                    // }
                ],
                data: [],
                url: '',//获取数据的url，必填(*)，如：/service/sys/q2/q
                q2Id: '',//获取数据的ID，必填(*)，如：userQ2InPage
                keyCol: '',//数据主键，必填(*)，如：userId
                bindProp: '',//输入框绑定的字段，必填(*)，如：userName
                sorting: '',//排序的字段，非必填，如：userName
                sortingType: '',//排序类型，非必填，与【sorting】同时使用。如：DESC
                params: {},//查询条件，非必填
                pageable: true,//是否有分页，非必填,默认：true
                pageSize: 10,//分页大小,非必填，默认：10
                width: 500,//弹框宽度,非必填，默认：500
                tableHeight: 300,//表格高度,非必填，默认：300
            },
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0
            },
            keyWords: null
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
    watch: {
        //监听父组件传过来绑定的值，若有则绑定到子组件上
        bind_data(val) {
            if(val) {
                if(this.config.bindProp.indexOf(".") != -1) {
                    for(var prop in val){
                        let obj = {};
                        if(prop == this.config.bindProp.split('.')[0]){
                            obj = val[prop];
                            for(var o in obj){
                                if(o == this.config.bindProp.split('.')[1]){
                                    this.keyWords = obj[o];
                                }
                            }
                        }
                    }
                }else {
                    for(var prop in val){
                        if(prop == this.config.bindProp){
                            this.keyWords = val[prop];
                        }
                    }
                }
            }
        }
    },
    methods: {
        /**
         * 获取数据
         */
        getData() {
            let _params = this.config.params ? this.config.params : {};
            var _authType = this.config.authType ? this.config.authType : null;
            let pageable = this.config.pageable == undefined ? true : this.config.pageable;

            _params['q2Id'] = this.config.q2Id;
            _params['authType'] = _authType;
            
            if (this.keyWords) {
                _params['keyWords'] = this.keyWords;
            }else {
                _params['keyWords'] = null;
            }

            let _pageSize = this.config.pageSize ? this.config.pageSize : 10;
            let _pageIndex = this.page.currentPage - 1;
            _pageSize = parseInt(_pageSize);
            _pageIndex = parseInt(_pageIndex);

            if (_pageIndex < 0) {
                _pageIndex = 0;
            }

            if (true == pageable) {
                _params['_IN_PAGE'] = 'true';
                _params['_PAGE'] = _pageIndex;
                _params['_PAGE_SIZE'] = _pageSize;
            }

            let sorting = this.config.sorting ? this.config.sorting : "";
            let sortingType = this.config.sortingType ? this.config.sortingType : "asc";
            if (sorting && "" != sorting) {
                _params['_SORT'] = sorting + "," + sortingType;
            }


            //当输入框禁用的时候就不请求数据
            if(!this.config.disabled) {
                this.$post(this.config.url,_params).then((response) => {
                    this.page.total = response.data.totalElements;
                    this.config.data = response.data.content;
                })
            }else {
                this.visible = false;
            }

            
        },
        /**
         * 实时搜索
         */
        getSearchData() {
            window.setTimeout(() => {//计时器以防不断请求
                this.getData();
            }, 500);
        },
        /**
         * 清空
         */
        clearData() {
            this.keyWords = null;
            this.page.currentPage = 1;
            this.getData();
            //通知父组件已清空了数据
            this.$emit('update:bind_data', {})
        },
        /**
         * 选择数据
         */
        dataSelect(row, column, event) {
            if(this.config.bindProp.indexOf(".") != -1) {
                for(var prop in row){
                    let obj = {};
                    if(prop == this.config.bindProp.split('.')[0]){
                        obj = row[prop];
                        for(var o in obj){
                            if(o == this.config.bindProp.split('.')[1]){
                                this.keyWords = obj[o];
                            }
                        }
                    }
                }
            }else {
                for(var prop in row){
                    if(prop == this.config.bindProp){
                        this.keyWords = row[prop];
                    }
                }
            }
            //向父组件传递选中的数据
            this.$emit('update:bind_data', row)
            this.visible = false;
        },
        /**
         * 切换每页显示的条数
         */
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.getData();
        },
        /**
         * 切换当前页
         */
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.getData();
        },
    },
    
}
</script>

<style scoped>
.wk-dropdown {
    display: inline-block;
    width: 100%;
}

.wk-dropdown-btns {
    display: flex;
    justify-content: flex-end;
}
</style>

<template>
    <div class="wk-table">
        <div class="wk-table-head">
            <div class="wk-table-head-panel">
                <span class="wk-table-title">{{config.title}}</span>
                <div  class="wk-table-head-btns">
                    <!-- 表格需要的其他操作功能按钮 -->
                    <el-button v-for="btn in config.actions" :key="btn.id" :type="btn.type" @click.stop="handleAct(btn.id)" size="small">
                        <i :class="btn.icon"></i>
                        <span>{{btn.label}}</span>
                    </el-button>
                    <!-- 搜索 -->
                    <el-button size="small" v-if="config.searchBtn" @click="clickSearch">
                        <i class="el-icon-search"></i>
                        <span>搜索</span>
                    </el-button>
                    <!-- 刷新 -->
                    <el-button size="small" v-if="config.refreshBtn" @click="clickRefresh">
                        <i class="el-icon-refresh"></i>
                        <span>刷新</span>
                    </el-button>
                </div>
            </div>

            <wk-search ref="highSearch"></wk-search>
        </div>
        
        <el-table
            :data="config.data"
            :height="config.height"
            :stripe="config.stripe"
            :border="config.border"
            :size="config.size"
            :fit="config.fit"
            :highlight-current-row="config.highlightCurrentRow"
            :show-summary="config.showSummary"
            @selection-change="handleSelectionChange"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            :header-cell-style="config.headerCellStyle"
            @sort-change="changeSort">
            <el-table-column
                v-if="config.selectType"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column width="50" fixed type="index" label="序号" :index="table_index"></el-table-column>
            <template v-for="(col,index) in config.headers">
                <!-- 不带有筛选条件的 -->
                <el-table-column
                    v-if="(!col.show || col.show != 'template') && !col.filters"
                    :label="col.label"
                    :key="index"
                    :prop="col.prop"
                    :sortable="col.sortable ? true : false"
                    :width="col.width ? col.width : col.baseWidth"
                    :fixed="col.fixed"
                    :align="col.align ? col.align : 'center'">
                </el-table-column>
                <!-- 带有筛选条件的 -->
                <el-table-column
                    v-if="(!col.show || col.show != 'template') && col.filters"
                    :label="col.label"
                    :key="index"
                    :prop="col.prop"
                    :sortable="col.sortable ? true : false"
                    :width="col.width ? col.width : col.baseWidth"
                    :column-key="col.prop"
                    :filters="col.filters"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                    :fixed="col.fixed"
                    :align="col.align ? col.align : 'center'">
                    <template slot-scope="scope">
                        <span v-html="bgFormatter(scope.row,col)"></span>
                    </template>
                </el-table-column>
                <!-- 其他自定义的类型（如:根据不同的状态显示不同的颜色） -->
                <el-table-column 
                    v-if="col.show == 'template'"
                    :label="col.label"
                    :key="index"
                    :sortable="col.sortable ? true : false"
                    :width="col.width ? col.width : col.baseWidth"
                    :fixed="col.fixed"
                    :align="col.align ? col.align : 'center'">
                    <template slot-scope="scope">
                        <slot :name="col.prop" :obj="scope"></slot>
                    </template>
                </el-table-column>
            </template>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button v-for="btn in config.btns" :key="btn.label" @click.stop="handleBtn(scope.$index, scope.row,btn.id)" type="text" size="small">{{btn.label}}</el-button>
                </template>
                </el-table-column>
        </el-table>

        <el-pagination
            v-if="config.pageable"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
import wkSearch from '../wkSearch'
export default {
    name: 'wkTable',
    components: {wkSearch},
    props: {
        config_parent: { 
            type: Object,
            default: () => {
                return {};
            },
        }
    },
    data () {
        return {
            config_default: {
                title: "",//表格名称
                autoTableWidth: true,//是否自动计算表头宽度，让文字不换行，默认为：true
                alias: "",//表格别名 -----必须配置（*）
                height: 500,//表格高度
                headerCellStyle: {'background-color':'rgba(235, 243, 251, 1)'},//表头单元格的 style
                stripe: false,//是否有斑马纹
                border: false,//是否带有纵向边框
                size: null,//Table 的尺寸medium / small / mini
                fit: true,//列的宽度是否自撑开
                highlightCurrentRow: false,//是否要高亮当前行
                showSummary: false,//是否在表尾显示合计行
                selectType: true,//表格是否显示多选框
                pageable: true,//表格下方是否显示分页
                pageSize: 10,//每页显示条数
                searchBtn: true,//搜索按钮
                refreshBtn: true,//刷新按钮
                headers: [//表头-----必须配置（*）
                    // {
                    //     prop: "field1",-----必须配置（*）
                    //     label: "姓名",-----必须配置（*）
                    //     type: "text",
                    //     sortable: false,//是否需要排序，默认为false
                    //     fixed: true,//列是否固定在左侧或者右侧，true 表示固定在左侧，true, left, right
                    //     align: "right",//对齐方式left/center/right
                    //     width: "",//宽度，以px为单位
                    //     show: "template",//需要自定义显示内容的，就需要配置该项
                    //     filters: [{text: '定包（过磅复核', value: 1, bg: '#f00'},{text: '散装（过磅计重）', value: 2, bg: '#d100ff'},{text: '管道（不过磅）', value: 3, bg: '#0f0'},{text: '钢瓶（过磅复核）', value: 4, bg: '#00f'}],
                    //     filters属性: 如果后台返回的状态是数字，而前端需要显示对应的文字，则需配置该项，其中【text】、【value】配置，【bg】按需配置
                    // }
                ],
                dataUrl: '',//-----必须配置（*）
                dataParams: {},
                defSort: '',//_Gen_ModuleApi.apiDesc
                defSortType: 'asc',
                data: [],
                btns : [],//表格行上的按钮
                actions: [{label:'添加API',icon:'plus',fun:function() {}, editable: function(){return false}},
                        {label:'删除API',icon:'trash',fun:function() {}, auth: '500'}
                ],//表头上的按钮
            },
            tableData: [],
            page: {
                currentPage: 1,
                pageSizes: [10,20,30,40,50,100],
                pageSize: 10,
                total: 0
            },
            likeCondition: null,
            multipleSelection: []
        }
    },
    created() {
        
    },
    mounted() {
        //初始化数据
        this.page.pageSize = this.config.pageSize;
        if(this.config.autoTableWidth) {
            this.setTableWidth();
        }
        
        this.initData();
    },
    computed: {
        //根据父组件的配置+默认配置=总的配置
        config() {
            return Object.assign(this.config_default,this.config_parent);
        }
    },
    methods: {
        /**
         * 使用span标签包裹内容，然后计算span的宽度 width： px
         * @param valArr
         */
        getTextWidth(str) {
            let width = 0;
            let html = document.createElement('span');
            html.innerText = str;
            html.className = 'getTextWidth';
            document.querySelector('body').appendChild(html);
            width = document.querySelector('.getTextWidth').offsetWidth;
            document.querySelector('.getTextWidth').remove();
            return width;
        },
        /**
        *自动设置表格宽度
        */
        setTableWidth() {
            const _this  = this;
            this.config.headers = _this.config.headers.map(function (value) {
                value.baseWidth = _this.getTextWidth(value.label) + 40; // 每列内容最大的宽度 + 表格的内间距(依据实际情况而定)
                return value;
            })
        },
       
        
        /**
         * 翻页后，序号连续
         */
        table_index(index){
            return (this.page.currentPage - 1) * this.page.pageSize + index + 1;
        },
        /**
         * 初始化数据
         */
        initData(searchParams) {
            let _pageSize = this.page.pageSize;
            let _pageIndex = this.page.currentPage - 1;
            _pageSize = parseInt(_pageSize);
            _pageIndex = parseInt(_pageIndex);

            if (_pageIndex < 0) {
                _pageIndex = 0;
            }
            let sorting = this.config.defSort;
            var sortingType = this.config.defSortType;
            var pageParams = "page=" + _pageIndex + "&size=" + _pageSize + "&sort=" + sorting + "," + sortingType;
            if (this.likeCondition && this.likeCondition != '') {
                this.config.dataParams["likeCondition"] = this.likeCondition;
            } else {
                delete this.config.dataParams["likeCondition"];
            }
            //ExtParams
            let dataParams = JSON.parse(JSON.stringify(this.config.dataParams));
            // if (this.config.extParams) {
            //     let o = {};
            //     Object.assign(o, dataParams, this.config.extParams);
            //     dataParams = o;
            // }
            // Object.assign(dataParams, this.config.sumParams);

            //Search
            let tempParams = null;
            if (searchParams && '' != searchParams) {
                tempParams = searchParams;
                if (null != dataParams['otherWhereClause'] && '' != dataParams['otherWhereClause']) {
                    tempParams = '(' + dataParams['otherWhereClause'] + ') and ' + searchParams['otherWhereClause'];
                }
            } else {
                if (null == dataParams['otherWhereClause'] || '' == dataParams['otherWhereClause']) {
                    delete dataParams['otherWhereClause'];
                }
            }
            if (tempParams) {
                dataParams['otherWhereClause'] = tempParams;
            }

            if (pageParams) {
                if(sorting){
                    dataParams['_PAGE'] = _pageIndex;
                    dataParams['_PAGE_SIZE'] = _pageSize;
                    dataParams['sorting'] = sorting + " " + sortingType;
                }else {
                    dataParams['_PAGE'] = _pageIndex;
                    dataParams['_PAGE_SIZE'] = _pageSize;
                }
            }
            this.$post(this.config.dataUrl,dataParams).then((response) => {
                this.page.total = response.data.totalElements;
                this.config.data = response.data.content;
                this.tableData = response.data.content;
            })
        },
        /**
         * 搜索
         */
        clickSearch() {
            this.$refs.highSearch.getQueryField(this.config);
        },
        /**
         * 刷新
         */
        clickRefresh() {
            this.initData();
        },
        /**
         * 表头按钮添加点击事件
         */
        handleAct(id) {
            const data = this.config.actions;
            for (let i = 0; i < data.length; i++) {
                if (id === data[i].id) {
                    if(this.multipleSelection.length == 0 && data[i].title == '删除') {
                        this.$notify({
                            title: '警告',
                            message: '请先选择需要删除的数据',
                            type: 'warning'
                        });
                        return;
                    }
                    //operation设置的Fun名在父组件当中使用
                    this.$emit(data[i].fun, this.multipleSelection);
                }
            }
        },
        /**
         * 操作按钮添加的点击事件
         *  */   
        handleBtn(index, row, id) {
            const data = this.config.btns;
            for (let i = 0; i < data.length; i++) {
                if (id === data[i].id) {
                    //operation设置的Fun名在父组件当中使用
                    this.$emit(data[i].fun, row);
                }
            }
        },
        /**
         * 格式化状态类型的字段，要根据配置设置不同的背景色
         */
        bgFormatter(row,col) {
            let template = "";
            if(col.prop.indexOf('.') != -1) {
                let obj = row[col.prop.split(".")[0]];
                if(obj) {
                    col.filters.forEach(item => {
                        if(item.value == obj[col.prop.split(".")[1]]) {
                            //判断是否需要背景色
                            if(item.bg) {
                                template = `<span style="background: ${item.bg};display: inline-block;color: #fff;padding: 4px 3px;border-radius: 4px;">${item.text}<span>`;
                            }else {
                                template = `<span>${item.text}<span>`
                            }
                            
                        }
                    });
                }
            }else {
                //只在数据第一层
                col.filters.forEach(item => {
                    if(item.value == row[col.prop]) {
                        //判断是否需要背景色
                            if(item.bg) {
                                template = `<span style="background: ${item.bg};display: inline-block;color: #fff;padding: 4px 3px;border-radius: 4px;">${item.text}<span>`;
                            }else {
                                template = `<span>${item.text}<span>`
                            }
                    }
                }); 
            }
            return template;
        },

        filterTag(value, row,column) {
            if(column.property.indexOf('.') != -1) {
                return row[column.property.split(".")[0]][column.property.split(".")[1]] === value;
            }else {
                //只在数据第一层
                return row[column.property] === value;
            }
            
        },
        
        /**
         * 多选
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        /**
         * 当某一行被点击时会触发该事件
         */
        rowClick(row, column, event) {
            this.$emit('rowClick',row, column, event);
        },
        /**
         * 当某一行被双击时会触发该事件
         */
        rowDblclick(row, column, event) {
            this.$emit('rowDblclick',row, column, event);
        },
        /**
         * 排序
         */
        changeSort(val) {
            console.log(val);
            this.config.defSort = `${this.config.alias}.${val.prop}`;
            if(val.order == "ascending") {
                this.config.defSortType = "asc";
            }else if(val.order == "descending") {
                this.config.defSortType = "desc";
            }
            this.initData();
        },
        /**
         * 切换每页显示的条数
         */
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.initData();
        },
        /**
         * 切换当前页
         */
        handleCurrentChange(val) {
            this.page.currentPage = val;
            this.initData();
        },

        


    },
    watch: {
        
    }
}
</script>

<style scoped>
.wk-table >>> .el-pagination {
    text-align: center;
    margin: 20px 0;
}
/* .wk-table >>> .el-table {
    width: auto;
} */

.wk-table-head {
    width: 100%;
    height: 60px;
    background: #F6F7F9;
    border: 1px solid #DEE5E7;
    border-bottom: none;

    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;

    
}
.wk-table-head-panel {
    height: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: space-between;
}
.wk-table-title {
    font-size: 700;
    font-size: 14px;
    font-family: Microsoft YaHei;
}
.wk-table-head-btns {
    display: flex;
    align-items: center;
    justify-items: center;
}

</style>

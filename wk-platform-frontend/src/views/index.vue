<template>
    <div>
        <el-row style="margin-bottom: 10px;">
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <label>业务员名称：</label>
                <wk-dropdown style="width: calc(100% - 110px);" :config_parent="dropdownConfig" :bind_data.sync="saleman"></wk-dropdown>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <label>过磅类型：</label>
                <wk-code-select style="width: calc(100% - 110px);" :config_parent="codeSelectConfig" :bind_data.sync="weighType"></wk-code-select>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-button @click="getChildVal">获取子组件的值</el-button>
            </el-col>
        </el-row>
        
        <wk-table 
            :config_parent="tableConfig" 
            @exportFun="exportFun"
            @addFun='addFun' 
            @editFun="editFun" 
            @auditFun="auditFun" 
            @deleteFun="deleteFun">
            <template slot-scope="props" slot="status">
                <span v-if="props.obj.row.dgr">
                    <el-tag v-if="props.obj.row.dgr.weighType == 1" type="success">标签1</el-tag>
                    <el-tag v-if="props.obj.row.dgr.weighType == 2" type="info">标签2</el-tag>
                    <el-tag v-if="props.obj.row.dgr.weighType == 3" type="warning">标签3</el-tag>
                    <el-tag v-if="props.obj.row.dgr.weighType == 4" type="danger">标签4</el-tag>
                </span>
            </template>
        </wk-table>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                saleman: {},
                dropdownConfig: {
                    title: '选择用户',
                    isDataCache: true,
                    headers: [{
                        prop: "userName",
                        label: "用户名称",
                        type: "text",
                        align: "center"
                    }, {
                        prop: "userPhone",
                        label: "电话",
                        type: "text",
                        align: "center"
                    }],
                    url: '/service/sys/q2/q',
                    q2Id: 'userQ2InPage',
                    keyCol: 'userId',
                    sorting: 'userName',
                    sortingType: 'DESC',
                    bindProp: 'userName'
                },

                weighType: {},
                codeSelectConfig: {
                    codeFc: 'weighType',
                    microseriveName: 'service',
                    disabledList: [1,3]
                },


                tableConfig: {
                    title: "磅单明细",
                    alias: "crmpl",
                    headerCellStyle: {'background-color':'rgba(255, 255, 255, 1)'},//表头单元格的 style
                    headers: [
                        {
                            prop: "firstWeighDt",
                            label: "进厂时间",
                            type: "date",
                            fixed: true,
                            align: "right",
                            width: 200
                        }, {
                            prop: "secondWeighDt",
                            label: "出厂时间",
                            type: "date",
                            fixed: true,
                            align: "center",
                            width: 200,
                            sortable: true
                        }, {
                            prop: "poundListCode",
                            label: "磅单编号",
                            type: "text",
                            sortable: true
                        }, {
                            prop: "dgr.deliverGoodsCode",
                            label: "发货单编号",
                            type: "text",
                            sortable: true
                        }, {
                            prop: "examineCode",
                            label: "检验单编号",
                            type: "text"
                        }, {
                            prop: "cust.customerName",
                            label: "客户名称",
                            type: "text"
                        },{
                            prop: "dgr.weighType",
                            label: "过磅方式1",
                            width: 200,
                            type: "type",
                            filters: [{text: '定包（过磅复核', value: 1, bg: '#f00'},{text: '散装（过磅计重）', value: 2, bg: '#d100ff'},{text: '管道（不过磅）', value: 3, bg: '#0f0'},{text: '钢瓶（过磅复核）', value: 4, bg: '#00f'}],
                        },{
                            prop: "status",
                            show: "template",
                            label: "过磅方式二",
                            type: "status"
                        }, {
                            prop: "carNumber",
                            label: "车牌号",
                            type: "text"
                        },{
                            prop: "carnum.approvedCapacity",
                            label: "核定载重量",
                            type: "text"
                        }, {
                            prop: "pd.productName",
                            label: "物料名称",
                            type: "text"
                        }, {
                            prop: "carrier.carriers",
                            label: "承运商",
                            type: "text"
                        }, {
                            prop: "grossWeight",
                            label: "毛重",
                            type: "text"
                        }, {
                            prop: "tareWeight",
                            label: "皮重",
                            type: "text"
                        }, {
                            prop: "netWeight",
                            label: "净重",
                            type: "text",
                            enableSum: true
                        }, {
                            prop: "deliveryWeight",
                            label: "发放重量",
                            type: "text",
                            enableSum: true
                        },{
                            prop: "content",
                            label: "含量",
                            type: "text"
                        }, {
                            prop: "valuationQuantity",
                            label: "出库数量",
                            type: "text",
                            enableSum: true
                        }, {
                            prop: "printDt",
                            label: "打印时间",
                            type: "text"
                        }, {
                            prop: "remark",
                            label: "备注",
                            type: "text"
                        }
                    ],
                    dataUrl: "/service/cRMPoundList/q?with=many",
                    dataParams: {otherWhereClause: "crmpl.status > 0"},
                    defSort: 'crmpl.printDt',
                    defSortType: 'desc',
                    btns : [{
                        id: 1,
                        label : '编辑',
                        fun : 'editFun'
                    },
                    {
                        id: 2,
                        label : '审核',
                        fun : 'auditFun'
                    }],
                    actions: [
                        {
                            id: 1,
                            label: "导出",
                            icon: "el-icon-download",
                            type: "default",
                            fun: 'exportFun'
                        },
                        {
                            id: 2,
                            label: "删除",
                            icon: "el-icon-delete",
                            type: "danger",
                            fun: 'deleteFun'
                        },
                        {
                            id: 3,
                            label: "添加字段",
                            icon: "el-icon-plus",
                            type: "primary",
                            fun: 'addFun'
                        }
                    ]
                }
            };
        },
        created() {

            //给wk-dropdown赋初始值
            this.$post("service/sys/q2/q",{
                "q2Id":"userQ2InPage",
                "authType":null,
                "_IN_PAGE":"true",
                "keyWords": "付涛",
                "_PAGE":0,
                "_PAGE_SIZE":10,
                "_SORT":"userName,DESC"
            }).then((response) => {
                this.saleman = response.data.content[0];
            });

            //给wk-code-select赋初始值
            this.$fetch(`/service/sysCode/fc?key=weighType`).then((response) => {
                this.weighType = response.data[1];
            })
        },
        methods: {
            //测试wk-dropdown、wk-code-select是否复赋值成成功
            getChildVal() {
                console.log(`wk-dropdown的值：`+this.saleman.userName);
                console.log(this.saleman);
                console.log(`wk-code-select的值：`+this.weighType.codeName);
                console.log(this.weighType);
            },

            // 编辑
            editFun(row) {
                this.$notify({
                    title: '成功',
                    message: '已成功拿到数据',
                    type: 'success'
                });
                console.log(row);
            },
            //审核
            auditFun(row) {
                this.$notify({
                    title: '成功',
                    message: '已成功拿到数据',
                    type: 'success'
                });
                console.log(row);
            },
            //导出
            exportFun(datas) {
                console.log(datas);
            },
            //添加
            addFun(datas) {
                console.log(datas);
            },
            //删除
            deleteFun(datas) {
                this.$notify({
                    title: '成功',
                    message: '已成功拿到数据',
                    type: 'success'
                });
                console.log(datas);
            },
        }
    };
</script>

<style scoped>

</style>

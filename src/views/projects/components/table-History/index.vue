<template>
  <div id="tableHistory">
    <el-table
      :data="histarydata"
      stripe
      :border="true"
      style="width: 100%;"
      :header-cell-style="{color:'#212529',fontSize:'16px',fontWeight:400}"
      :row-style="{fontSize:'16px',color:'#212529;',fontWeight:400,}"
    >
      <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
      <el-table-column label="上报时间" width="150px" align="center">
        <template slot-scope="scope">{{scope.row.time|dateTimeFormat}}</template>
      </el-table-column>
      <el-table-column prop="frequency" label="频率(Hz)" width="100px" align="center"></el-table-column>
      <el-table-column prop="level" label="动液面(米)" width="100px" align="center"></el-table-column>
      <el-table-column prop="output" label="产量(吨)" align="center"></el-table-column>
      <el-table-column prop="power_consumption" label="日耗电(千瓦时)" width="150px" align="center"></el-table-column>
      <el-table-column label="平衡度" width="100px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.welltype=='抽油机'">
            <span>{{scope.row.balance}}</span>
          </div>
          <div v-if="scope.row.welltype=='螺杆泵'">
            <span>{{"-"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="建议调整量1(米)" width="150px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.welltype=='抽油机'">
            <span>{{scope.row.adjustment1}}</span>
          </div>
          <div v-if="scope.row.welltype=='螺杆泵'">
            <span>{{"-"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="建议调整量2(米)" width="150px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.welltype=='抽油机'">
            <span>{{scope.row.adjustment2}}</span>
          </div>
          <div v-if="scope.row.welltype=='螺杆泵'">
            <span>{{"-"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="建议调整量3(米)" width="150px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.welltype=='抽油机'">
            <span>{{scope.row.adjustment3}}</span>
          </div>
          <div v-if="scope.row.welltype=='螺杆泵'">
            <span>{{"-"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="建议调整量4(米)" width="150px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.welltype=='抽油机'">
            <span>{{scope.row.adjustment4}}</span>
          </div>
          <div v-if="scope.row.welltype=='螺杆泵'">
            <span>{{"-"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="建议调整量5(米)" width="150px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.welltype=='抽油机'">
            <span>{{scope.row.adjustment5}}</span>
          </div>
          <div v-if="scope.row.welltype=='螺杆泵'">
            <span>{{"-"}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="active" label="有功(千瓦)" width="100px" align="center"></el-table-column>
      <el-table-column prop="electric_current" label="电流(安培)" width="120px" align="center"></el-table-column>
      <el-table-column prop="rush_times" label="冲次(次/分)/转速(转/分)" width="120px" align="center"></el-table-column>
      <el-table-column prop="stroke" label="冲程(米)" align="center"></el-table-column>
      <el-table-column prop="oil_pressure" label="油压(兆帕)" width="100px" align="center"></el-table-column>
      <el-table-column prop="nesting_pressure" label="套压(兆帕)" width="100px" align="center"></el-table-column>
    </el-table>
    <div class="block" style="text-align: right">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="margin-top:10px"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ApiGetHistorydata } from "@/api/realdata";
export default {
  name: "tableHistory",
  data() {
    return {
      histarydata: [],
      currentPage: 1,
      pageSize: 20,
      pageSizeList: [20, 30, 50, 100],
      total: 0,
      cutType: -1, //分页类型
      wellid: "",
      id: this.$route.params.id,
      hisdate:''
    };
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      switch (this.cutType) {
        case -1:
          this.getHistoryData(this.id,this.hisdate); //正常查看
          break;
        // case 1:
        //   this.searchWell(); //筛选分页查看
        //   break;
      }
      //
    },
    //解决索引旨在当前页排序的问题，增加函数自定义索引序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    getHistoryData(wellid,date) {
       
      let lines = {};
      lines = {
        wellid: wellid,
        action: "history",
        daterange:date,
        welldetail: "",
        page: this.currentPage,
        pagenum: 20
      };
      ApiGetHistorydata(lines).then(res => {
        //  console.log(res)
        this.histarydata = res.data.msg;
        this.total = res.data.counts;
      });
    }
  },
  created() {
  // this.getHistoryData();
  }
};
</script>

<style lang="scss">
</style>
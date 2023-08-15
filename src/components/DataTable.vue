<template>
  <div class="table-box">
    <table class="table">
      <tr>
        <th v-for="title in tableTitles" :key="title">{{ title }}</th>
      </tr>
      <tr v-for="datas, i in tableDatas" :key="i">
        <td v-for="data, i in datas" :key="i">{{ data }}</td>
        <td class="action-column">
          <div v-if="actionSubmitInput != null">
            <div>
              <input type="text" :id="datas.id" name="fee" placeholder="Fee" class="fee">
              <button type="submit" class="submit-button" @click="callParentSubmitInputFunction(datas.id)">
                <i class="bi bi-currency-dollar"></i>
              </button>
            </div>
          </div>
          <div v-if="actionModify != null">
            <div>
              <button class="modify-button" @click="callParentModifyFunction(datas.id, datas.booking_id)">
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>
          </div>
          <div v-if="actionDetail != null">
            <div>
              <button class="detail-button" @click="callParentDetailFunction(datas.id, datas.booking_id)">
                <i class="bi bi-ticket-detailed"></i>
              </button>
            </div>
          </div>
          <div v-if="actionSubmit != null">
            <div>
              <button type="submit" class="submit-button" @click="callParentSubmitFunction(datas.id)">
                <i class="bi bi-check-circle"></i>
              </button>
            </div>
          </div>
          <div v-if="actionDanger != null">
            <div>
              <button class="danger-button" @click="callParentDangerFunction(datas.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    tableDatas: {
      type: Object,
      required: true
    },
    tableTitles: {
      type: Object,
      required: true
    },
    actionDanger: {
      type: String,
      required: false,
      default: null
    },
    actionModify: {
      type: String,
      required: false,
      default: null
    },
    actionDetail: {
      type: String,
      required: false,
      default: null
    },
    actionSubmit: {
      type: String,
      required: false,
      default: null
    },
    actionSubmitInput: {
      type: String,
      required: false,
      default: null
    },
    functionDetail: {
      type: Function,
      required: false,
    },
    functionModify: {
      type: Function,
      required: false,
    },
    functionDanger: {
      type: Function,
      required: false,
    },
    functionSubmit: {
      type: Function,
      required: false,
    },
    functionSubmitInput: {
      type: Function,
      required: false,
    }
  },

  setup(props) {
    const callParentDetailFunction = (param1, param2, param3) => {
      props.functionDetail(param1, param2, param3);
    }

    const callParentModifyFunction = (param1, param2) => {
      props.functionModify(param1, param2);
    }

    const callParentDangerFunction = (param1) => {
      props.functionDanger(param1);
    }

    const callParentSubmitFunction = (param1) => {
      props.functionSubmit(param1);
    }

    const callParentSubmitInputFunction = (param1) => {
      const param2 = document.getElementById(param1).value;
      console.log(param2)
      props.functionSubmitInput(param1, param2);
    }
    return {
      callParentDetailFunction,
      callParentModifyFunction,
      callParentDangerFunction,
      callParentSubmitFunction,
      callParentSubmitInputFunction
    }
  }
}
</script>

<style scoped>
.action-column {
  display: flex;
}
</style>

<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 14:34:13
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 15:01:55
-->
<template>
  <div class="text-left">
    <div class="text-3xl text-center leading-loose py-5">同学列表</div>
    <div class="flex justify-end ">
      <button class="bg-sky-200 hover:bg-sky-300 boxsizing h-10 w-20 mr-20 mb-5" type="primary" @click="showFlag = true">新增</button>
    </div>
    <ul class="odd:bg-white even:bg-slate-50 px-6 text-center ">
      <li class="list-none flex justufy-start items-center h-16 border-b border-solid border-neutral-200 bg-slate-100">
        <span class="w-1/6">序号</span>
        <span class="w-1/5">学号</span>
        <span class="w-1/6">姓名</span>
        <span class="w-1/5">年龄</span>
        <div class="grow flex justify-around">操作</div>
        <!-- <button @click="deleteUser(index)">删除</button>
        <button @click="editUser(index)">编辑</button>
        <button @click="getYourName(item.id)">问名字</button> -->
      </li>
      <li class="list-none flex justufy-start items-center h-16 border-b border-solid border-neutral-200" v-for="(item, index) in list" :key="item.id">
        <span class="w-1/6">{{ index + 1 }}.</span>
        <span class="w-1/5">{{ item.id }}</span>
        <span class="w-1/6">{{ item.userName }}</span>
        <span class="w-1/5">{{ item.age }}</span>
        <div class="grow flex justify-around">
          <button class="hover:bg-slate-100 border-none w-20 h-10" @click="deleteUser(index)">删除</button>
          <button class="hover:bg-slate-100 border-none w-20 h-10" @click="editUser(index)">编辑</button>
          <button class="hover:bg-slate-100 border-none w-20 h-10" @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>

    <div class="absolute bg-white rounded-lg left-1/2 top-1/2 
    transform -translate-x-1/2 -translate-y-1/2 p-6 border border-solid 
    border-neutral-200 flex-col w-200 h-80" v-if="showFlag">
      <h2 class="text-center">{{isEdit ? '编辑同学' : '新增同学'}}</h2>
      <div class="flex grow shrink flex-col justify-center">
        <div class="h-9 text-2xl flex mt-3">
          <span class="mr-3 2-12">学号</span>
          <input class="h-9 grow shrink text-base" type="text" v-model="studyNum">
        </div>
        <div class="h-9 text-2xl flex mt-3">
          <span class="mr-3 2-12">姓名</span>
          <input class="h-9 grow shrink text-base" type="text" v-model="name">
        </div>
        <div class="h-9 text-2xl flex mt-3">
          <span class="mr-3 2-12">年龄</span>
          <input class="h-9 grow shrink text-base" type="text" v-model="year">
        </div>
      </div>
      <div class="flex justify-end w-full">
        <button class="mt-10 w-20 h-10 mr-3 bg-white text-blue-500 border border-solid border-blue-500" type="primary" @click="showFlag = false">取消</button>
        <button class="mt-10 w-20 h-10 text-white bg-blue-500 px-4 py-2" type="primary" @click="submitFn">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';

const userStore=useUserStore();
const { userList } = storeToRefs(userStore);
//方法不需要时响应式的 storeToRefs 不会去处理方法 许哟啊去userStore结构
const {setUserList} = userStore;

let showFlag = ref(false);
let isEdit = ref(false);
let curIdx = ref(0);

let studyNum = ref('');
let name = ref('');
let year = ref('');

let list = reactive([
  {
    id: 220812022,
    userName: '刘淑文',
    age: 18
  },
  {
    id: 220812008,
    userName: '蔡欣怡',
    age: 18
  },
  {
    id: 220812030,
    userName: '龙依',
    age: 18
  }
]);


const deleteUser = index => {
  userList.value.splice(index, 1);
};

const addUser = () =>{
  isEdit.value = false;
  showFlag.value = true;
}

const editUser = index => {
  isEdit.value = true;
  curIdx.value = index;
  const item = userList.value[index];
  // item.age = 22;
  // todo: 拿到的item信息填入弹窗对应的输入框里
  studyNum.value = item.id;
  name.value = item.userName;
  year.value = item.age;
  showFlag.value = true;
};

const checkList = (code) =>{
  for(let index = 0; index < userList.value.length; index++){
    const element = userList.value[index];
    if(element.id === code){
      return true;
    }
  }
  return false;
}

const addNum2name= (name) =>{
  //将姓名后面追加最新编号
  let total =0;
  userList.value.map(item =>{
    if(item.userName.indexOf(name) !== -1){
      let tempItem=item;
      let tempItemName = tempItem.userName.slice(name.length);
      let checkItem = isNum(tempItemName.join(''));
      console.log('tempItemName is num:',checkItem);
      if(tempItemName.length ===0 || checkItem){
        total++;
      }
    }
  })
  return `${name}${total === 0 ? '' : total}`;
}

const isNum = val =>{
  let exg = /^\d+$/;
  if(!exg.test(val)){
    return false;
  }
  return true;
}

const submitFn = () => {
  //输入内容校验
  let StudyNumCheck = isNum(studyNum.value);
  if(!StudyNumCheck){
    alert('学号只能是数字');
    return;
  }
  let tempName = addNum2name(name.value);
  if (isEdit.value) { // 编辑
   userList.value.splice(curIdx.value, 1);
   tempName = name.value;
  } 
  let isStudyNumExist = checkList(studyNum.value);
  if(isStudyNumExist){
    alert('学号已存在');
    return;
  }
  userList.value.unshift({
    id: studyNum.value,
    userName: tempName,
    age: year.value
  })
  console.log(userList.value);
  showFlag.value = false;
}

const getYourName = id => {
  const student = userList.value.find(item => item.id === id);
  alert(student.userName);
};
</script>
<script setup>
const api = inject('$api')

const query = {
  pageNo: 1,
  pageSize: 12
}

const getRoomList = async () => {
  const { result } = await api.room.getRoomList(query)
  console.log(result.orders.data)
}
</script>

<template>
  <div>
    <div class="w-full min-h-screen flex flex-col items-center justify-center gap-50px">
      <a @click="getRoomList" class="bg-#feb401 py-20px px-40px rounded-lg cursor-pointer text-32px border-balck border-5px shadow-[6px_6px_0px_black] active:translate-y-5px active:translate-x-5px decoration-none font-bold">GET ROOM</a>
    </div>
  </div>
</template>

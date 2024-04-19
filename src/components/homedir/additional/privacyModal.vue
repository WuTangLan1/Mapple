<!-- src\components\homedir\additional\privacyModal.vue -->

<script>

</script>

<template>
    <div class="modal-overlay">
        <div class="modal-content">
            
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2); 
  max-width: 60%; 
  text-align: center;
  position: relative; 
  transition: all 0.3s ease; 
  margin-bottom: 20%;
  animation: dropAnimation 1.5s ease-in-out forwards;
}
</style>
<template>

    -
    
</template>

<style>

.parent {
    display: -webkit-flex;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
}
    
.div1 {
    grid-column: span 2 / span 2;
    grid-row: span 3 / span 3;
}

.div2 {
    grid-column: span 2 / span 2;
    grid-row: span 3 / span 3;
    grid-column-start: 3;
}
        
</style>


<script>
export default {
  name: 'UbicacionMain',
}

</script>
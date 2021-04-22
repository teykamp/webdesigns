<template>
    <div>
        <div id="container">
            <nav>
                <ul>
                    <p>dsadsa</p>
                    <p>fdsfdsf</p>
            
                    <!-- put button objects here -->
                </ul>
            </nav>
        </div>
        <footer>
            footer
        </footer>
    </div>
</template>

<script>

export default {
    name: 'List',
    data() {
        return {

        }
    },
}
</script>

<style scoped>

nav ul {
    max-height: 800px; 
    width: 10em;
    overflow: hidden;
    overflow-y: scroll;
}

footer {
    position: absolute;
    bottom: 0;
    padding-left: 10px;
    color: aquamarine;
}

#container {
    margin-right: 5px;
    color: black;
    background: white;
    height: 95vh;
}
</style>

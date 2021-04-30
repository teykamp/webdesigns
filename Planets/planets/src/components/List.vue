<template>
    <div>
        <div id="container">
            <nav>
                <ul>
                    <div v-for="planet in planetList" :key="planet.id">
                        <div v-if="planet.id != -1">
                            <div v-if="planet.mass > 5000">
                                <div id="button">
                                    <button>
                                    {{"Sun: " + planet.id}}
                                    {{"Mass: " + planet.mass}}
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                <div id="button">
                                    <button>
                                    {{"Planet: " + planet.id}}
                                    {{"Mass: " + planet.mass}}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </nav>
        </div>
        <footer>
            footer
            and freeze sun
            and description
            <button id="freezer" on-click="sunFreeze()">FREEZE SUN</button>
        </footer>
    </div>
</template>

<script>

export default {
    name: 'List',

    props: ['planetList'],

    data() {
        return {
            
        }
    },

    methods: {
        sunFreeze() {
            this.planetList[0].freeze = true;
        }
    }
}
</script>

<style scoped>

button {
    width: 100%;
    height: 4em;
}

nav ul {
    padding-top: 1rem;
    padding-right: 2rem;
    float: center;
    max-height: 400px; 
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

#freezer {
    width: 80%;
}

#container {
    border-right: 1px solid black;
    margin-right: 5px;
    color: black;
    background: rgb(22, 22, 22);
    height: 95vh;
}
</style>

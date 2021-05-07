<template>
    <div>
        <div id="container">
            <nav>
                <ul>
                    <div v-for="planet in planetList" :key="planet.id">
                        <div v-if="planet.id != -1">
                            <div class="card">
                                <div class="title">
                                    <div v-if="planet.mass > 5000">
                                        <p>{{"Sun: " + planet.id}}</p> 
                                    </div>
                                    <div v-else-if="planet.mass < 500">
                                        <p>{{"Moon: " + planet.id}}</p>
                                    </div>
                                    <div v-else>
                                        <p>{{"Planet: " + planet.id}}</p>
                                    </div>
                                </div>
                                <div class="functions">
                                    <p>Mass:</p>
                                    <input type="number" min="0" step="50" v-model="planet.mass"/><br>
                                    <button class="delete" v-on:click="$emit('emitter', [2, planet.id])">Delete</button>
                                    <!-- 2 = delete, 3 = freeze -->
                                    <button class="freeze" v-on:click="$emit('emitter', [3, planet.id])"> {{freezeHelper(planet.freeze)}} </button>    
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
        </footer>
    </div>
</template>

<script>
/*
 * TODO: 
 * - add planet mass input field
 * - add planet card (freeze, mass, delete buttons)
 * - add $emit for planet cards
 * - fix footer
 * - make prettier
 * - add collision effects (and maybe mass combine?)
 */

export default {
    name: "List",
    components: {

    },
    props: ["planetList"],

    data() {
        return {
            freezeText: "Freeze Sun"  
        }
    },
    // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
    // https://masteringjs.io/tutorials/vue/emit
    methods: {
        freezeHelper(freezeType) {
            if (freezeType) {
                return "Unfreeze";
            }
            return "Freeze";
        },
    }
}
</script>

<style scoped>

button {
    width: 6em;
    height: 4em;
}

nav ul {
    padding-top: 1rem;
    padding-right: 2rem;
    float: center;
    max-height: 600px; 
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

.card {
    background: rgb(36, 36, 36);
    color: lightslategray;
    width: 200px;
    margin-left: -38px;
    border: solid 1px pink;
    padding-bottom: 5px;
    margin-bottom: 5px;
}
.title {
    text-align: center;
    font-weight: bold;
}

.functions {
    margin-left: 20px;

}

</style>

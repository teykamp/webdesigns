<template>
    <div>
        <div id="container">
            <nav>
                <ul>
                    <div v-for="planet in planetList" :key="planet.id">
                        <div v-if="planet.id != -1">
                            <div v-if="planet.mass > 5000">
                                <div id="button">
                                    <button v-on:click="$emit('emitter', [2, planet.id])">
                                    {{"Sun: " + planet.id}}
                                    {{"Mass: " + planet.mass}}
                                    </button>
                                </div>
                            </div>
                            <div v-else>
                                <div id="button">
                                    <button v-on:click="$emit('emitter', [2, planet.id])">
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
            <button id="freezer" v-on:click="$emit('emitter', [1]); freezeToggle()">{{freezeText}}</button>
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

    props: ["planetList"],

    data() {
        return {
            freezeText: "Freeze Sun"
            
        }
    },
    // https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
    // https://masteringjs.io/tutorials/vue/emit
    methods: {
        freezeToggle() {
            this.freezeText = this.freezeText == 'Freeze Sun' ? 'Unfreeze Sun' : 'Freeze Sun';
        },
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

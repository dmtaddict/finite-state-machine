class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */

    constructor(config) {
        this.activeState = config.initial;
        this.states = [];
        this.states = config.states;
        this.stateHistory = [];
        this.stateHistory.push(this.activeState);
        return this.activeState;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try {
            if (this.states[state]) {
                this.activeState = state;
                this.stateHistory.push(state);
            }
            else {
                throw new SyntaxError("Incorrect state");
            }
        }

        catch(e){
            throw e;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.changeState(this.states[this.activeState].transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.stateHistory[0];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(event){
            return this.states[this.activeState].transitions[event];
        }
        else{
            let States = Array(this.states.length);
            for (let i = 0; i< this.states.length; i++){
                States[i] = this.states[i];
            }
            return States;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.stateHistory.length > 1){
            this.activeState = this.stateHistory[this.stateHistory - 2];
        }
        else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.activeState !== this.stateHistory[this.stateHistory.length-1]){
            this.activeState = this.stateHistory[this.stateHistory - 1];
        }
        else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        while(this.stateHistory.length > 1){
            this.stateHistory.pop();
        }
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

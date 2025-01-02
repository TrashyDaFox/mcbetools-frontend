<script>
	import axios from 'axios';
    import { createEventDispatcher, getContext } from 'svelte';
	import config from '../config';
    const loggedInUser = getContext("loggedInUser");
    
    const dispatch = createEventDispatcher();
    
    // Initialize an array of 6 empty values to bind to the inputs
    let otpValues = Array(6).fill('');
    
    // This will track the entered OTP code
    let otpCode = '';
// /is-valid-mfa-code/:code    
    // Refs for input elements to manually control focus
    let inputs = [];
    
    // Handle user input for each input field
    const handleInput = (e, index) => {
      const value = e.target.value;
  
      // If the value is numeric, replace the value in otpValues[index]
      if (/^[0-9]$/.test(value)) {

      } else {
        // If the user types anything that's not a digit, ignore it
        // e.target.value = otpValues[index];
      }
    };
  
    // Handle backspace key for moving between fields
    // let usedTimeStamps = new Map();
    const handleBackspace = (index, e) => {

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        let value = e.key;
        otpValues[index] = value;
        otpCode = otpValues.join('');
        if(index == 5) error = false;
        if (otpCode.length === 6) {
          // Dispatch 'ontotpinput' event when the code is complete
        //   dispatch('ontotpinput', otpCode);
            axios.get(`${config.apiEndpoint}/is-valid-mfa-code/${otpCode}`, {
                headers: {
                    Authorization: localStorage.getItem("sessionToken")
                }
            }).then(res=>{
                if(!res.data.status) {
                    error = true;
                } else {
                    dispatch('ontotpinput', otpCode)
                }
            })
        }
  
        // Move focus to the next input if it's not the last one
        if (index < otpValues.length - 1 && value.length === 1) {
        // usedTimeStamps.set(e.timeStamp, true)
          inputs[index + 1].focus();
        }
      } else if(!/^[0-9]$/.test(e.key) && e.key !== 'Backspace') {
        e.preventDefault();
      } else if (e.key === 'Backspace' && otpValues[index] === '') {
        if (index > 0) {
            error = false;
          otpValues[index - 1] = '';
          otpCode = otpValues.join('');
          dispatch('ontotpinput', otpCode);
          inputs[index - 1].focus();
        }
      }
    };
  
    // Prop for error state to be passed from parent component
    export let error = false;
  </script>
  
  <div class="flex space-x-2">
    {#each otpValues as value, index}
      <input
        type="text"
        maxlength="1"
        bind:value={otpValues[index]}
        on:input={(e) => handleInput(e, index)}
        on:keydown={(e) => handleBackspace(index, e)}
        bind:this={inputs[index]}
        disabled={$loggedInUser ? $loggedInUser.hasMfaEnabled ? false : true : true}
        class="w-20 h-20 font-bold text-3xl input text-center animate__animated {error ? "animate__headShake" : ""}"
      />
    {/each}
  </div>
  
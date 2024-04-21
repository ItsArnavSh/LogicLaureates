<script>
    import "../app.css";
    import {token} from '../writeables/authWriteables';
    import {loginTokenApi} from '../services/operations/auth'

    if($token){
      loginTokenApi($token);
    }
  </script>
  
  <slot />
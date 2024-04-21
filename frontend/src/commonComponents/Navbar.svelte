<script>
    import {user} from '../writeables/authWriteables'
</script>

<div class="flex justify-between p-4">
    <h1 class="font-bold font-Karla">Welcome {user.firstName} {user.lastName}</h1>
    <a href="/Profile"><img class="rounded-full w-6" src={user.profileImage} alt="profileImage"></a>
</div>
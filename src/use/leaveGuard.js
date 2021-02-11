import {onBeforeRouteLeave, useRouter} from 'vue-router'
import {ref} from 'vue'
export function useLeaveGuard(hasChanges) {
    const leave = ref(false)
    const canLeave = ref(false)
    const leaveTo = ref(null)
    const router = useRouter()

    onBeforeRouteLeave((to) => {
        leaveTo.value = to.path
        if(hasChanges.value && !canLeave.value) {
          leave.value = true
          return false
        } 
        return true
      })
  
    const navigate = () => {
        leave.value = false
        canLeave.value = true
        router.push(leaveTo.value)
    }

    return {
      navigate,
      leave
    }
}
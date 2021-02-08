import accountStore from '@/store/account'

// 既可以通过权限id，也可以通过权限名称来鉴权
export const checkPermission = (permissionId?: number, permissionName?: string) => {
	const permissionList = accountStore.accountInfo.permission.filter(item => item.type === 'button')
	if (permissionId) {
		return permissionList.some(item => item.id === permissionId)
	} else if (permissionName) {
		return permissionList.some(item => item.name === permissionName)
	} else {
		return true
	}
}

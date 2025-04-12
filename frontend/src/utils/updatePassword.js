import authService from '../services/authService.js';
const updatePassword = async () => {
    const currentPassword = prompt('Enter your current password:');
    if (!currentPassword) return;

    const newPassword = prompt('Enter your new password:');
    if (!newPassword) return;

    try {
        const response = await authService.handlePassword(currentPassword, newPassword);
        console.log(response);
        alert('Password updated successfully!');
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Failed to update password. Please try again.');
    }
}

export default updatePassword;
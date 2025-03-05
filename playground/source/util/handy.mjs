export function getVerifyCode() {
    return Math.random().toString(36).slice(-4);
}

const generiereZufaelligeID = () => {
    return `id-${Math.random().toString(36).slice(2, 9)}-${Date.now()}`;
};

export default generiereZufaelligeID;
const generiereZufaelligeID = () => {
    return `id-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
};

export default generiereZufaelligeID;
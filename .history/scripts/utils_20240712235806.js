function restartAnim(obj, anim) {
    if (obj) {
        obj.classList.remove(anim);
        void obj.offsetWidth; // Trigger a reflow. Ensures animation starts at beginning.
        obj.classList.add(anim);
    }
    else console.error('Object not found for restartAnim');
}
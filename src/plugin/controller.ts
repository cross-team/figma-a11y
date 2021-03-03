figma.showUI(__html__, {
    height: 250,
});

figma.loadFontAsync({family: 'Roboto', style: 'Regular'});

figma.ui.postMessage(figma.currentPage.selection);
figma.on('selectionchange', () => {
    figma.ui.postMessage(figma.currentPage.selection);
});

function createMetadata(state) {
    console.log('debug_start');
    let textNodes = [];
    Object.keys(state).forEach(key => {
        console.log('debug_loop_start');
        let textNode = figma.createText();
        console.log('debug_create_text');
        textNode.characters = `aria-${key}: ${state[key].toString()}`;
        textNode.name = `aria-${key}`;
        textNodes.push(textNode);
        console.log('debug_loop_end');
    });
    console.log('debug_after_start');
    let group = figma.group(textNodes, figma.currentPage);
    console.log('debug_create_group');
    group.visible = false;
    group.name = 'metaData';
    return group;
}

figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'add':
            let node = figma.getNodeById(msg.selected[0].id);
            let metaData = createMetadata(msg.state);
            if (node.type === 'COMPONENT' || node.type === 'INSTANCE' || node.type === 'GROUP') {
                node.appendChild(metaData);
            }
            break;
        default:
            break;
    }

    // figma.closePlugin();
    // Uncomment the line above if you want the plugin to close after running a single message call
};

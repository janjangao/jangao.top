"use client";

import {
    combineWrapper,
    PhucbmWrapper,
    createGiscusCommentsWrapper,
} from "@/common/component/Wrapper/Wrapper";

const GiscusCommentsWrapper = createGiscusCommentsWrapper({
    repo: "janjangao/jangao.top",
    repoId: "R_kgDORRUPew",
    category: "Announcements",
    categoryId: "DIC_kwDORRUPe84C2o2p",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: "en",
    loading: "lazy",
});

export default combineWrapper([PhucbmWrapper, GiscusCommentsWrapper]);

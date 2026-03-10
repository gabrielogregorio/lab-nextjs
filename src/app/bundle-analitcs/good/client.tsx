"use client";

import kebabCase from "lodash/kebabCase";

export function GoodClient() {
    return <div>{kebabCase("Hello World")}</div>;
}
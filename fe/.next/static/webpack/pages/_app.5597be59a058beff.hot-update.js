"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/header/Header.tsx":
/*!******************************************!*\
  !*** ./src/components/header/Header.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var react_icons_hi2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-icons/hi2 */ \"./node_modules/react-icons/hi2/index.esm.js\");\n/* harmony import */ var _redux_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../redux/hooks */ \"./src/redux/hooks/index.ts\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _NavController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavController */ \"./src/components/header/NavController.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);\nvar _jsxFileName = \"/Users/jangchanhee/Documents/newCode/main/seb43_main_011/fe/src/components/header/Header.tsx\",\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst Container = styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"].header.withConfig({\n  displayName: \"Header__Container\",\n  componentId: \"sc-1vdlliq-0\"\n})([\"height:85px;background-color:#ffff;transition:all 0.3s ease;\", \" position:fixed;top:0;left:0;right:0;z-index:3;\"], props => props.isNavOpen ? \"\" : \"box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);\");\n_c = Container;\nconst ItemArea = styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"].div.withConfig({\n  displayName: \"Header__ItemArea\",\n  componentId: \"sc-1vdlliq-1\"\n})([\"width:1360px;height:100%;display:flex;align-items:center;justify-content:space-between;margin:0 auto;\"]);\n_c2 = ItemArea;\nconst LogoWrapper = styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"].div.withConfig({\n  displayName: \"Header__LogoWrapper\",\n  componentId: \"sc-1vdlliq-2\"\n})([\"margin-right:20px;> img{height:80px;}\"]);\n_c3 = LogoWrapper;\nconst SearchContainer = styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"].div.withConfig({\n  displayName: \"Header__SearchContainer\",\n  componentId: \"sc-1vdlliq-3\"\n})([\"display:flex;align-items:center;width:100%;max-width:900px;margin-left:0.5rem;padding:0.5rem;border:1px solid #d5d4d4;border-radius:10px;\", \"\"], _ref => {\n  let {\n    isfocus\n  } = _ref;\n  return isfocus && `outline: none;\n    border: 1px solid #96a5ff;\n    box-shadow: 0 0 5px 1px #abb7fc;`;\n});\n_c4 = SearchContainer;\nconst SearchInput = styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"].input.withConfig({\n  displayName: \"Header__SearchInput\",\n  componentId: \"sc-1vdlliq-4\"\n})([\"border:none;width:95%;outline:none;margin-right:10px;font-size:1.3rem;\"]);\n_c5 = SearchInput;\nconst SearchIcon = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(react_icons_hi2__WEBPACK_IMPORTED_MODULE_7__.HiMagnifyingGlass).withConfig({\n  displayName: \"Header__SearchIcon\",\n  componentId: \"sc-1vdlliq-5\"\n})([\"font-size:1.5rem;margin:0 1rem 0 0.2rem;\", \"\"], _ref2 => {\n  let {\n    isfocus\n  } = _ref2;\n  return isfocus && `color: #96a5ff;`;\n});\n_c6 = SearchIcon;\nconst Menu = styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"].nav.withConfig({\n  displayName: \"Header__Menu\",\n  componentId: \"sc-1vdlliq-6\"\n})([\"display:flex;gap:20px;margin:22px;\"]);\n_c7 = Menu;\nconst MenuItem = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__[\"default\"])((next_link__WEBPACK_IMPORTED_MODULE_1___default())).withConfig({\n  displayName: \"Header__MenuItem\",\n  componentId: \"sc-1vdlliq-7\"\n})([\"color:#5a5a5a;background-color:#ffff;width:max-content;font-weight:bold;padding:1rem;border-radius:10px;margin-right:10px;text-decoration:none;&:hover{cursor:pointer;background-color:#8092f6;color:#ffff;}\"]);\n_c8 = MenuItem;\n\nconst Header = () => {\n  _s();\n\n  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n  const isNavOpen = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_0__.useAppSelector)(state => state.NavOpen.value);\n  const {\n    0: searchText,\n    1: setSearchText\n  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n  const {\n    0: isFocus,\n    1: setIsFocus\n  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n  let isLogin = false;\n\n  if (sessionStorage.getItem(\"UTK\") !== undefined) {\n    isLogin = true;\n  }\n\n  const searchOnChangeHandle = e => setSearchText(e.target.value);\n\n  const searchOnSumbitHandle = e => {\n    if (e.key === \"Enter\" && searchText !== \"\") {\n      router.push(`/search?value=${searchText}`);\n      setSearchText(\"\");\n    }\n  };\n\n  const endPoind = isLogin ? \"/myPage\" : \"/signin\";\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Container, {\n    isNavOpen: isNavOpen,\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(ItemArea, {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n        href: \"/\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(LogoWrapper, {\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(\"img\", {\n            src: \"../../images/headerlogo1.png\",\n            alt: \"Logo\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 120,\n            columnNumber: 13\n          }, undefined)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 119,\n          columnNumber: 11\n        }, undefined)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 118,\n        columnNumber: 9\n      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(SearchContainer, {\n        isfocus: isFocus,\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(\"p\", {\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(SearchIcon, {\n            isfocus: isFocus\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 125,\n            columnNumber: 13\n          }, undefined)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 124,\n          columnNumber: 11\n        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(SearchInput, {\n          type: \"text\",\n          placeholder: \"\\uC624\\uB298\\uC758 \\uCE75\\uD14C\\uC77C\\uC740?\",\n          onChange: searchOnChangeHandle,\n          onKeyUp: searchOnSumbitHandle,\n          value: searchText,\n          onFocus: () => setIsFocus(true),\n          onBlur: () => setIsFocus(false)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 127,\n          columnNumber: 11\n        }, undefined)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 123,\n        columnNumber: 9\n      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Menu, {\n        children: [!isLogin && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(MenuItem, {\n            href: endPoind,\n            children: \"\\uB85C\\uADF8\\uC778\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 141,\n            columnNumber: 15\n          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(MenuItem, {\n            href: \"/signup\",\n            children: \"\\uD68C\\uC6D0\\uAC00\\uC785\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 142,\n            columnNumber: 15\n          }, undefined)]\n        }, void 0, true), isLogin && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(MenuItem, {\n            href: endPoind,\n            children: \"\\uB9C8\\uC774\\uD398\\uC774\\uC9C0\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 147,\n            columnNumber: 15\n          }, undefined)\n        }, void 0, false)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 138,\n        columnNumber: 9\n      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_NavController__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 151,\n        columnNumber: 9\n      }, undefined)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 117,\n      columnNumber: 7\n    }, undefined)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 116,\n    columnNumber: 5\n  }, undefined);\n};\n\n_s(Header, \"xXY1XYfPhFUEWrW5H8eGc4Ifd+c=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter, _redux_hooks__WEBPACK_IMPORTED_MODULE_0__.useAppSelector];\n});\n\n_c9 = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\nvar _c, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;\n\n$RefreshReg$(_c, \"Container\");\n$RefreshReg$(_c2, \"ItemArea\");\n$RefreshReg$(_c3, \"LogoWrapper\");\n$RefreshReg$(_c4, \"SearchContainer\");\n$RefreshReg$(_c5, \"SearchInput\");\n$RefreshReg$(_c6, \"SearchIcon\");\n$RefreshReg$(_c7, \"Menu\");\n$RefreshReg$(_c8, \"MenuItem\");\n$RefreshReg$(_c9, \"Header\");\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWVBLE1BQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvaGVhZGVyL0hlYWRlci50c3g/ZDgzMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgSGlNYWduaWZ5aW5nR2xhc3MgfSBmcm9tIFwicmVhY3QtaWNvbnMvaGkyXCI7XG5pbXBvcnQgeyB1c2VBcHBTZWxlY3RvciB9IGZyb20gXCIuLi8uLi9yZWR1eC9ob29rc1wiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IE5hdkNvbnRyb2xsZXIgZnJvbSBcIi4vTmF2Q29udHJvbGxlclwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuaGVhZGVyPHsgaXNOYXZPcGVuOiBib29sZWFuIH0+YFxuICBoZWlnaHQ6IDg1cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAkeyhwcm9wcykgPT5cbiAgICBwcm9wcy5pc05hdk9wZW5cbiAgICAgID8gXCJcIlxuICAgICAgOiBcImJveC1zaGFkb3c6IDBweCA1cHggMjBweCByZ2JhKDE1MiwgMTUyLCAxNTIsIDAuMjQpO1wifVxuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHotaW5kZXg6IDM7XG5gO1xuXG5jb25zdCBJdGVtQXJlYSA9IHN0eWxlZC5kaXZgXG4gIHdpZHRoOiAxMzYwcHg7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW46IDAgYXV0bztcbmA7XG5cbmNvbnN0IExvZ29XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xuICA+IGltZyB7XG4gICAgaGVpZ2h0OiA4MHB4O1xuICB9XG5gO1xuXG5pbnRlcmZhY2UgU2VhcmNoSW5wdXRGb2N1cyB7XG4gIGlzZm9jdXM6IGJvb2xlYW47XG59XG5cbmNvbnN0IFNlYXJjaENvbnRhaW5lciA9IHN0eWxlZC5kaXY8U2VhcmNoSW5wdXRGb2N1cz5gXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDkwMHB4O1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNkNWQ0ZDQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICR7KHsgaXNmb2N1cyB9KSA9PlxuICAgIGlzZm9jdXMgJiZcbiAgICBgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjOTZhNWZmO1xuICAgIGJveC1zaGFkb3c6IDAgMCA1cHggMXB4ICNhYmI3ZmM7YH1cbmA7XG5jb25zdCBTZWFyY2hJbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgYm9yZGVyOiBub25lO1xuICB3aWR0aDogOTUlO1xuICBvdXRsaW5lOiBub25lO1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xuYDtcbmNvbnN0IFNlYXJjaEljb24gPSBzdHlsZWQoSGlNYWduaWZ5aW5nR2xhc3MpPFNlYXJjaElucHV0Rm9jdXM+YFxuICBmb250LXNpemU6IDEuNXJlbTtcbiAgbWFyZ2luOiAwIDFyZW0gMCAwLjJyZW07XG4gICR7KHsgaXNmb2N1cyB9KSA9PiBpc2ZvY3VzICYmIGBjb2xvcjogIzk2YTVmZjtgfVxuYDtcbmNvbnN0IE1lbnUgPSBzdHlsZWQubmF2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDIwcHg7XG4gIG1hcmdpbjogMjJweDtcbmA7XG5jb25zdCBNZW51SXRlbSA9IHN0eWxlZChMaW5rKWBcbiAgY29sb3I6ICM1YTVhNWE7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmO1xuICB3aWR0aDogbWF4LWNvbnRlbnQ7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBwYWRkaW5nOiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM4MDkyZjY7XG4gICAgY29sb3I6ICNmZmZmO1xuICB9XG5gO1xuXG5jb25zdCBIZWFkZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBpc05hdk9wZW4gPSB1c2VBcHBTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLk5hdk9wZW4udmFsdWUpO1xuICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRm9jdXMsIHNldElzRm9jdXNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBsZXQgaXNMb2dpbiA9IGZhbHNlO1xuXG4gIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiVVRLXCIpICE9PSB1bmRlZmluZWQpIHtcbiAgICBpc0xvZ2luID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHNlYXJjaE9uQ2hhbmdlSGFuZGxlID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PlxuICAgIHNldFNlYXJjaFRleHQoZS50YXJnZXQudmFsdWUpO1xuXG4gIGNvbnN0IHNlYXJjaE9uU3VtYml0SGFuZGxlID0gKGU6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiAmJiBzZWFyY2hUZXh0ICE9PSBcIlwiKSB7XG4gICAgICByb3V0ZXIucHVzaChgL3NlYXJjaD92YWx1ZT0ke3NlYXJjaFRleHR9YCk7XG4gICAgICBzZXRTZWFyY2hUZXh0KFwiXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBlbmRQb2luZCA9IGlzTG9naW4gPyBcIi9teVBhZ2VcIiA6IFwiL3NpZ25pblwiO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lciBpc05hdk9wZW49e2lzTmF2T3Blbn0+XG4gICAgICA8SXRlbUFyZWE+XG4gICAgICAgIDxMaW5rIGhyZWY9e1wiL1wifT5cbiAgICAgICAgICA8TG9nb1dyYXBwZXI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIi4uLy4uL2ltYWdlcy9oZWFkZXJsb2dvMS5wbmdcIiBhbHQ9XCJMb2dvXCIgLz5cbiAgICAgICAgICA8L0xvZ29XcmFwcGVyPlxuICAgICAgICA8L0xpbms+XG4gICAgICAgIDxTZWFyY2hDb250YWluZXIgaXNmb2N1cz17aXNGb2N1c30+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICA8U2VhcmNoSWNvbiBpc2ZvY3VzPXtpc0ZvY3VzfSAvPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8U2VhcmNoSW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi7Jik64qY7J2YIOy5te2FjOydvOydgD9cIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3NlYXJjaE9uQ2hhbmdlSGFuZGxlfVxuICAgICAgICAgICAgb25LZXlVcD17c2VhcmNoT25TdW1iaXRIYW5kbGV9XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGV4dH1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHNldElzRm9jdXModHJ1ZSl9XG4gICAgICAgICAgICBvbkJsdXI9eygpID0+IHNldElzRm9jdXMoZmFsc2UpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU2VhcmNoQ29udGFpbmVyPlxuXG4gICAgICAgIDxNZW51PlxuICAgICAgICAgIHshaXNMb2dpbiAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8TWVudUl0ZW0gaHJlZj17ZW5kUG9pbmR9PuuhnOq3uOyduDwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgIDxNZW51SXRlbSBocmVmPXtcIi9zaWdudXBcIn0+7ZqM7JuQ6rCA7J6FPC9NZW51SXRlbT5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge2lzTG9naW4gJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPE1lbnVJdGVtIGhyZWY9e2VuZFBvaW5kfT7rp4jsnbTtjpjsnbTsp4A8L01lbnVJdGVtPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9NZW51PlxuICAgICAgICA8TmF2Q29udHJvbGxlciAvPlxuICAgICAgPC9JdGVtQXJlYT5cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiJdLCJuYW1lcyI6WyJzdHlsZWQiLCJIaU1hZ25pZnlpbmdHbGFzcyIsInVzZUFwcFNlbGVjdG9yIiwiTGluayIsIk5hdkNvbnRyb2xsZXIiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkNvbnRhaW5lciIsImhlYWRlciIsInByb3BzIiwiaXNOYXZPcGVuIiwiSXRlbUFyZWEiLCJkaXYiLCJMb2dvV3JhcHBlciIsIlNlYXJjaENvbnRhaW5lciIsImlzZm9jdXMiLCJTZWFyY2hJbnB1dCIsImlucHV0IiwiU2VhcmNoSWNvbiIsIk1lbnUiLCJuYXYiLCJNZW51SXRlbSIsIkhlYWRlciIsInJvdXRlciIsInN0YXRlIiwiTmF2T3BlbiIsInZhbHVlIiwic2VhcmNoVGV4dCIsInNldFNlYXJjaFRleHQiLCJpc0ZvY3VzIiwic2V0SXNGb2N1cyIsImlzTG9naW4iLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1bmRlZmluZWQiLCJzZWFyY2hPbkNoYW5nZUhhbmRsZSIsImUiLCJ0YXJnZXQiLCJzZWFyY2hPblN1bWJpdEhhbmRsZSIsImtleSIsInB1c2giLCJlbmRQb2luZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/header/Header.tsx\n"));

/***/ })

});
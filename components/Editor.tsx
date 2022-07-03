/* Ace editor */
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({ value, onChange }: { value?: string; onChange(value: string): void }) => {
    return (
        <div >
            <AceEditor
                width="100%"
                height="200px"
                minLines={5}
                maxLines={50}
                mode="css"
                theme="xcode"
                name="ace_editor"
                fontSize={16}
                showPrintMargin={false}
                showGutter={false}
                highlightActiveLine={false}
                value={value}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                readOnly={false}
                editorProps={{ $blockScrolling: true }}
                onChange={(value) => onChange(value)}
                debounceChangePeriod={500}
            />
        </div>
    )
}
export default Editor;
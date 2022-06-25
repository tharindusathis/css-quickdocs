import InlinePlayground from "../../components/InlinePlayground"

const Playground = () => {
    return (
        <InlinePlayground defaultCss={`
        position: fixed;
        left: 150px; 
        top: 150px;
        `}></InlinePlayground>
    )
}

export default Playground
import Aes from '../../components/Aes'

const EncryptDecrypt = () => {
    return(
        <>
            <br />
            <Aes encrypt={true} />
            <br />
            <Aes encrypt={false} />
        </>
    )
}
export default EncryptDecrypt
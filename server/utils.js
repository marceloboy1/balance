const handleGastosUpload = (file) => {
    file.mv('./temp/userGastos.xlsx');

}

module.exports = {handleGastosUpload}
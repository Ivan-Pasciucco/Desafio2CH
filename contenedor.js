const fs = require("fs");


class Contenedor {
  constructor(path) {
    this.path = path;
  }

  async save(element) {
    try {
      const contenido = fs.readFileSync(this.path);
      const contenidoParsed = JSON.parse(contenido);

      element["id"] = contenidoParsed[contenidoParsed.length - 1].id + 1;
      fs.writeFileSync(
        "./productos.txt",
        JSON.stringify([...contenidoParsed, element], null, 3)
      );
    } catch (c) {
      fs.writeFileSync(
        "./productos.txt",
        JSON.stringify([{ ...element, id: 0 }], null, 3)
      );
    }
  }

   getById(id) {
    try {
      const productos = this.getAll();
      return productos.find((producto) => id === producto.id);
    } catch (error) {
      console.log(error);
    }
  }
  getAll() {
    try {
     const contenido = fs.readFileSync(this.path);
      return JSON.parse(contenido, null, 3); 
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const contenido = await fs.promises.readFile('./productos.txt', 'utf-8')
      const contenidoParsed = JSON.parse(contenido)
      let index = contenidoParsed.map(producto => producto.id).indexOf(id)
      contenidoParsed.splice(index,1)

      await fs.promises.writeFile('./productos.txt', JSON.stringify(contenidoParsed, null , 2))
      console.log(contenidoParsed)
    } catch(error){
      console.log(error, 'error');
      console.log('no se encuentra lo solicitado');
    }
  }
  
  async deleteAll() {
    try {
      fs.writeFileSync("./productos.txt", "");
      console.log('Archivo vaciado');
    } catch (error) {
      console.log(error);
    }
  }
}

 //const productos = new Contenedor("./productos.txt");

module.exports = Contenedor;
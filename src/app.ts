console.log("*************premières lignes de code en TypeScript****************")

interface FSElement {
      Nom : string;
      readonly Taille : number;
}

enum Permission {Read = 'r', Write = 'w', Exec = 'x', Sticky = 's'}

class MyFile implements FSElement{

     Nom : string;
     Taille : number;
     Permission : Permission[];

     constructor(nom : string, taille : number, permission : Permission[]){
        this.Nom = nom;
        this.Taille = taille;
        this.Permission = permission;
     }

}

class MyFolder  implements FSElement{
     
     ListElement : Array<FSElement>;
     Nom : string;

     constructor(listElement : Array<FSElement>, nom : string){
        this.ListElement = listElement;
        this.Nom = nom;
     }

     get Taille() : number {
        var taillefolder : number = 0;
        this.ListElement.forEach( e => {
            taillefolder = taillefolder + e.Taille;
        });
        return taillefolder;
     }

     addElement (element: FSElement){
        this.ListElement.push(element);
     }

     
}

console.log("***********Fichier***************")
let file1 = new MyFile("FILE1",10,[Permission.Read, Permission.Write]);
console.log(file1);

console.log("***********Dossier***************")
//let listElt = [file1, ...]
let folder1 = new MyFolder([file1], "FOLDER1");
console.log(folder1);


console.log("************Comprendre la programmation asynchrone*************")
//Indique à TypeScript que nous allons utiliser la librairie standard de nodeJs.
//npm install -D @types/node

import * as fs from "fs/promises";
/* au lieu de import * as fs from "fs";*/

fs.readFile("./file.txt")
    .then(data => console.log("Function successfully returned: ", data))
    .catch(err => console.log("Error: ",err))

console.log("****************************************")

console.log("*************************************************")

console.log("**********************************************")
/*
fs.readdir(folder, (err, data) => {
    if (err) {
      console.error("cannot read this folder");
      return;
    }
    data.forEach((file) => {
      fs.stat(folder + "/" + file, (error, stats) => {
        if (error) {
          console.error("cannot get permission for this file", file, error);
          return;
        } else {
          if (!(4 & parseInt((stats.mode & parseInt("777", 8)).toString(8)[0]))) {
            console.error("change permission for ", file);
            fs.chmod(
              folder + "/" + file,
              "" + ((stats.mode & parseInt("777", 8)) + 400),
              (error1) => {
                if (error1) {
                  console.error("cannot change permission for this file", file);
                  return;
                }
              }
            );
          }
        }
      });
    });
  });
*/

console.log("**********************************************")
const myPromise = new Promise((resolve, reject) => {
    // traitement lent
    // Ici, on calcule la factorielle 100 et on place le résultat dans x.
    let x = 1
    for (let i = 2; i < 1000; i++) {
        x = x * i
    }
    if (x === Infinity) {
        // ici on applique la fonction de callback
        // gérant les erreurs en lui passant la raison de l'erreur
        reject(new Error("Overflow"))
    } else {
        // ici, on déclenche la résolution de la promesse avec comme paramètre: x
        resolve(x)
    }
})

myPromise
.then(result => console.log("Succes: ", result))
.catch(err => console.log("Error: ", err))

console.log("***************fonctions asynchrones comme des fonctions synchrones: async/await*****************")
async function f(x: number): Promise<number> {
    for (let i = 0; i < 1000000000; i++) { }
    return x + 1
}


const v = f(1);
console.log(v);

/*
async function test() {
    const v= await f(1)
    console.log(v)
}
test()
*/

function test() {
    f(1).then(data => console.log(data))
}
test()

/*
async function myFileReaderFunction(){
    const data = await fs.readFile("./dist/app.js");
}
*/

async function checkFolder(folder:string){
    const data = await fs.readdir(folder);
    for (const file of data){
      const stats = await fs.stat(folder + "/" + file)
      // (stats.mode & parseInt("777", 8) est un moyen de passer les droits sur le système de fichiers en base 8.
      // On récupère ensuite la valeur entre 0 et 7 du premier chiffre. C'est les droits pour l'utilisateurs courant. Petite explication ici
      // https://astuces-informatique.com/que-signifie-chmod-777/
      if (!(4 & parseInt((stats.mode & parseInt("777", 8)).toString(8)[0]))) {
        console.error("change permission for ", file);
        await fs.chmod( folder + "/" + file,
              "" + ((stats.mode & parseInt("777", 8)) + 400));
       }
    }
  }
  
  checkFolder("/tmp");


  console.log("************************************");

  const file = "file.txt";
  
  async function readMyFile(){
      try{
          const data = await fs.readFile(file);
      } catch (e){
          console.error(e);
      }
  }
  console.log("************************************");

  
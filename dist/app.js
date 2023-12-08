"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("*************premières lignes de code en TypeScript****************");
var Permission;
(function (Permission) {
    Permission["Read"] = "r";
    Permission["Write"] = "w";
    Permission["Exec"] = "x";
    Permission["Sticky"] = "s";
})(Permission || (Permission = {}));
class MyFile {
    constructor(nom, taille, permission) {
        this.Nom = nom;
        this.Taille = taille;
        this.Permission = permission;
    }
}
class MyFolder {
    constructor(listElement, nom) {
        this.ListElement = listElement;
        this.Nom = nom;
    }
    get Taille() {
        var taillefolder = 0;
        this.ListElement.forEach(e => {
            taillefolder = taillefolder + e.Taille;
        });
        return taillefolder;
    }
    addElement(element) {
        this.ListElement.push(element);
    }
}
console.log("***********Fichier***************");
let file1 = new MyFile("FILE1", 10, [Permission.Read, Permission.Write]);
console.log(file1);
console.log("***********Dossier***************");
//let listElt = [file1, ...]
let folder1 = new MyFolder([file1], "FOLDER1");
console.log(folder1);
console.log("************Comprendre la programmation asynchrone*************");
//Indique à TypeScript que nous allons utiliser la librairie standard de nodeJs.
//npm install -D @types/node
const fs = __importStar(require("fs/promises"));
/* au lieu de import * as fs from "fs";*/
fs.readFile("./file.txt")
    .then(data => console.log("Function successfully returned: ", data))
    .catch(err => console.log("Error: ", err));
console.log("****************************************");
console.log("*************************************************");
console.log("**********************************************");
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
console.log("**********************************************");
const myPromise = new Promise((resolve, reject) => {
    // traitement lent
    // Ici, on calcule la factorielle 100 et on place le résultat dans x.
    let x = 1;
    for (let i = 2; i < 1000; i++) {
        x = x * i;
    }
    if (x === Infinity) {
        // ici on applique la fonction de callback
        // gérant les erreurs en lui passant la raison de l'erreur
        reject(new Error("Overflow"));
    }
    else {
        // ici, on déclenche la résolution de la promesse avec comme paramètre: x
        resolve(x);
    }
});
myPromise
    .then(result => console.log("Succes: ", result))
    .catch(err => console.log("Error: ", err));
console.log("***************fonctions asynchrones comme des fonctions synchrones: async/await*****************");
function f(x) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 1000000000; i++) { }
        return x + 1;
    });
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
    f(1).then(data => console.log(data));
}
test();
/*
async function myFileReaderFunction(){
    const data = await fs.readFile("./dist/app.js");
}
*/
function checkFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fs.readdir(folder);
        for (const file of data) {
            const stats = yield fs.stat(folder + "/" + file);
            // (stats.mode & parseInt("777", 8) est un moyen de passer les droits sur le système de fichiers en base 8.
            // On récupère ensuite la valeur entre 0 et 7 du premier chiffre. C'est les droits pour l'utilisateurs courant. Petite explication ici
            // https://astuces-informatique.com/que-signifie-chmod-777/
            if (!(4 & parseInt((stats.mode & parseInt("777", 8)).toString(8)[0]))) {
                console.error("change permission for ", file);
                yield fs.chmod(folder + "/" + file, "" + ((stats.mode & parseInt("777", 8)) + 400));
            }
        }
    });
}
checkFolder("/tmp");
console.log("************************************");
const file = "file.txt";
function readMyFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs.readFile(file);
        }
        catch (e) {
            console.error(e);
        }
    });
}
console.log("************************************");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHFFQUFxRSxDQUFDLENBQUE7QUFPbEYsSUFBSyxVQUE4RDtBQUFuRSxXQUFLLFVBQVU7SUFBRSx3QkFBVSxDQUFBO0lBQUUseUJBQVcsQ0FBQTtJQUFFLHdCQUFVLENBQUE7SUFBRSwwQkFBWSxDQUFBO0FBQUEsQ0FBQyxFQUE5RCxVQUFVLEtBQVYsVUFBVSxRQUFvRDtBQUVuRSxNQUFNLE1BQU07SUFNUCxZQUFZLEdBQVksRUFBRSxNQUFlLEVBQUUsVUFBeUI7UUFDakUsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0NBRUw7QUFFRCxNQUFNLFFBQVE7SUFLVCxZQUFZLFdBQThCLEVBQUUsR0FBWTtRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1AsSUFBSSxZQUFZLEdBQVksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzFCLFlBQVksR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sWUFBWSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxVQUFVLENBQUUsT0FBa0I7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUdMO0FBRUQsT0FBTyxDQUFDLEdB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
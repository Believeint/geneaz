/// <reference path="familytree.d.ts" />
// Conexao com Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getDatabase, ref, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyB26kv2VCXe1FzxMVpu-65f78t4P0JILMU",
    authDomain: "geneaz.firebaseapp.com",
    databaseURL: "https://geneaz-default-rtdb.firebaseio.com",
    projectId: "geneaz",
    storageBucket: "geneaz.appspot.com",
    messagingSenderId: "1090047398827",
    appId: "1:1090047398827:web:87cb7016a55cf50c25b8ee",
    measurementId: "G-1JNWN0BQYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
const dbRef = ref(db);

var dataGeneaz = [];

FamilyTree.SEARCH_PLACEHOLDER = 'Pesquisar';
FamilyTree.templates.john.img_0 = '';
FamilyTree.RES.IT_IS_LONELY_HERE_LINK = 'Carregando...';
//FamilyTree.match.boundary = 1;
//FamilyTree.match.height = 1;
//FamilyTree.match.width = 1;
//FamilyTree.orientation.top = 1;

var data = [

    { id: 1, mid: 12, fid: 13, pids: [2], fn: "Tania", name: "Tania Maria Carvalho Souza", gender: "female", ldata: "01/01/1965", ImgUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    { id: 2, mid: 14, fid: 15, pids: [1], fn: "Claudionor", name: "Claudionor Alcantara dos Santos", gender: "male" },
    { id: 3, mid: 1, fid: 2, fn: "Elias", name: "Elias Carvalho dos Santos", gender: "male" },
    { id: 4, mid: 1, fid: 2, fn: "Pedro", name: "Pedro Henrique Carvalho dos Santos", gender: "male" },
    { id: 5, mid: 1, fid: 2, fn: "Davi", name: "Davi Carvalho dos Santos", gender: "male" },
    { id: 6, pids: [7], mid: 1, fid: 2, fn: "Katia", name: "Katia Carvalho dos Santos", gender: "female" },
    { id: 7, pids: [6], fn: "Alexandre", name: "Alexandre Brito", gender: "male" },
    { id: 8, mid: 6, fid: 7, fn: "Arthur", name: "Arthur Carvalho de Brito", gender: "male" },
    { id: 9, mid: 6, fid: 7, fn: "Miguel", name: "Miguel Carvalho de Brito", gender: "male" },
    { id: 10, mid: 6, fid: 7, fn: "Samuel", name: "Samuel Carvalho de Brito", gender: "male" },
    { id: 11, mid: 6, fid: 7, fn: "Laura", name: "Laura Carvalho de Brito", gender: "female" },
    { id: 12, pids: [13], fn: "Maria", name: "Maria Filgueira Carvalho", gender: "female" },
    { id: 13, pids: [12], fn: "Cirilo", name: "Cirilo Rodrigues de Souza", gender: "male" },
    { id: 14, pids: [15], fn: "Rosalina", name: "Rosalina Vitorina dos Santos", gender: "male", divorced: "15" },
    { id: 15, pids: [14], fn: "Pedro Alcantara", name: "Pedro Alcantara dos Santos", gender: "male", divorced: "14" },
];

var family = new FamilyTree(document.getElementById("tree"), {
    //miniMap: true,
    //padding: 20,
    //mouseScrool: FamilyTree.none,
    levelSeparation: 50,
    siblingSeparation: 50,
    subtreeSeparation: 50,
    //mouseScrool: FamilyTree.action.none,
    template: 'tommy',
    mode: 'light',
    // state: {
    //     name: 'StateForGeneAZ',
    //     readFromLocalStorage: false,
    //     writeToLocalStorage: false,
    //     readFromIndexedDB: true,
    //     writeToIndexedDB: true,
    //     readFromUrlParams: false,
    //     writeToUrlParams: false
    // },
    //searchFields: ["name"],
    //filterBy: ['gender'],
    menu: {
        pdf: { text: 'Exportar PDF' },
        png: { text: "Exportar PNG" },
        svg: { text: "Exportar SVG" },
        json: { text: "Exportar JSON" },
        importJSON: {
            text: 'Importar JSON',
            icon: FamilyTree.icon.json(24, 24, '#00ff00'),
            onClick: function() { family.importJSON(); }
        }
    },
    nodeBinding: {
        field_0: "fn",
        field_1: "ldata",
        img_0: "ImgUrl",
    },
    // nodeMenu: {
    //     details: {text: "Detalhes"},
    //     edit: { text: "Editar" }
    // },
    //nodes: data,
    tags: {
        filter: {
            template: 'dot'
        }
    },
    nodeTreeMenu: true,
    // nodeMenu: {
    //     call: {
    //         icon: FamilyTree.icon.edit(24,24,'#fff'),
    //         text: "Call now",
    //         onClick: callHandler
    //     }
    // },
    // clinks: [
    //     { from: 3, to: 1, label: 'Filho', template: 'blue' }
    // ],
    nodeMouseClick: FamilyTree.action.details,
    //editForm: {readOnly: true}
    editForm: {
        addMore: 'Adicionar +',
        addMoreFieldName: "Nome do Campo",
        cancelBtn: "Cancelar",
        saveAndCloseBtn: "Salvar",
        generateElementsFromFields: false,
        elements: [
            {type: 'textbox', label: "Nome", binding: 'fn'},
            {type: 'textbox', label: "Nome Completo", binding: 'name'},
            {type: 'select', options:[
                {value: 'male', text: "Masculino"},
                {value: 'female', text: "Feminino"},
            ], label: "Gênero", binding: 'gender'},
            {type: 'date', label: "Data Nascimento", binding: 'ldata'},
            {type: 'textbox', label: "Url Imagem", binding: 'ImgUrl'},
            {type: 'textbox', label: 'Teste', binding: 'teste'},
            {type: 'textbox', label: 'dvcd', binding: 'divorced'}
        ],
        buttons: {
            edit: {
                icon: FamilyTree.icon.edit(24,24,'#fff'),
                text: 'Editar',
                hideIfEditMode: true,
                hideIfDetailsMode: false
            },
            share: {
                icon: FamilyTree.icon.share(24,24,'#fff'),
                text: 'Compartilhar'
            },
            // pdf: {
            //     icon: FamilyTree.icon.pdf(24,24,'#fff'),
            //     text: 'Salvar como PDF'
            // },
            pdf: null,
            remove: {
                icon: FamilyTree.icon.remove(24,24,'#fff'),
                text: 'Remover'
            }
        }
    }
});

get(child(dbRef, 'geneazData')).then(async (snapshot) => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
        console.log(user)
        if(user) {
            if(snapshot.exists()) {
                dataGeneaz = JSON.parse(snapshot.val());
                family.load(dataGeneaz);
            } else {
                console.log("Sem dados disponíveis");
                family.load(data);
            }
        } else {
            FamilyTree.RES.IT_IS_LONELY_HERE_LINK = 'Sem acesso...';
            console.log('Sem acesso ao sistema');
        }
    });
    
}).catch((error) => {
    console.log(error);
});


/// ADD DIVISOR DIVORCIO
// family.on('render-link', function(sender, args) {
//     var cnodeData = family.get(args.cnode.id);
//     var nodeData = family.get(args.node.id);

//     if (cnodeData.divorced != undefined && nodeData.divorced != undefined &&
//         cnodeData.divorced.includes(args.node.id) && nodeData.divorced.includes(args.cnode.id)) {
//           console.log(args.html);
//           args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
//       }
// });

// // ADD LINK PARA UM CAMPO
// family.on('field', function(sender, args) {
//     var name = args.data['fn'];
//     if(args.data['link']) {
//         var link = args.data['link'];
//         args.value = '<a target="_blank" href="' + link + '">' + name +  '</a>';
//     }

// });

family.on('import', (e, dados) => {
    let dataRef = child(dbRef ,'geneazData', null);
    remove(dataRef);

    dataGeneaz = dados;
})

family.on('updated', (e)=> {
    let dataRef = child(dbRef ,'geneazData', null);
    remove(dataRef);

    var updates = {};    
    updates['geneazData'] = JSON.stringify(e.config.nodes);
    return update(dbRef, updates);
});


// const panel = document.getElementById("treePanel");

// var btn = document.createElement('button');
// btn.innerText = 'Pesq';
// btn.addEventListener('click', ()=> {
//     // var parent = [];
//     // parent['id'] = 12;
//     // parent['fn'] = "Maria";
//     // parent['name'] = "Maria Filgueira Carvalho";
//     // parent['gender'] = "female";

//     // family.addParentNode(1, "mid", parent, (callback) => {
//     //     console.log(callback);
//     // });
// });
// panel.appendChild(btn);

// function callHandler(nodeId) {
//     alert(nodeId)
//     //var nodeData = chart.get(nodeId);
//     //var employeeName = nodeData["name"];
//     //window.open('https://webcall.me/' + employeeName, employeeName, 'width=340px, height=670px, top=50px, left=50px');
// }

//family.load(dataGeneaz);
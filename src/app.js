App = {
    contracts: {},
    loading: false,

    initialize: async () => {
        console.log('app loading')
        await App.loadWeb3()
        await App.loadContract()
        await App.render()      
    },

    loadWeb3: async () => {
        if (window.ethereum) {
            try {
                // Request account access if needed
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                App.web3Provider = window.ethereum;
                window.web3 = new Web3(window.ethereum);
                App.account = accounts[0];
            } catch (error) {
                // User denied account access...
                console.error("User denied account access");
            }
        } else {
            window.alert("Please connect to Metamask.");
        }
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
        console.log("App.todoList: ")
        console.log(App.todoList)
    },    

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    },

    renderTasks: async () => {
        // Load the total task count from the blockchain
        const taskCount = await App.todoList.taskCount()
        const $taskTemplate = $('.taskTemplate')

        for (var i = 1; i <= taskCount; i++) {
            // Fetch the task data from the blockchain
            const task = await App.todoList.tasks(i)
            const taskId = task[0].toNumber()
            const taskContent = task[1]
            const taskCompleted = task[2]
        
            // Create the html for the task
            const $newTaskTemplate = $taskTemplate.clone()
            $newTaskTemplate.find('.content').html(taskContent)
            $newTaskTemplate.find('input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            .on('click', App.toggleCompleted)
        
            // Put the task in the correct list
            if (taskCompleted) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }
        
            // Show the task
            $newTaskTemplate.show()
        }
      },

    createTask: async () => {
        App.setLoading(true)
        const content = $('#newTask').val()
        await App.todoList.createTask(content, {from:App.account})
        window.location.reload()
    },

    toggleCompleted: async (e) => {
        App.setLoading(true)
        const taskId = e.target.name
        await App.todoList.toggleCompleted(taskId, {from:App.account})
        window.location.reload()
    },

    render: async() => {
        // prevent double render
        if (App.laoding) {
            return 
        }

        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)

        // Render Tasks
        await App.renderTasks()

        App.setLoading(false)
    },
    
}

$(() => {
    $(window).load(() => {
        App.initialize()
    })
})
;(function () {
    window.TaskManager = function (domEl) {
        this.id = 0;
        domEl.addEventListener('click', function (e) {
            if (e.target.tagName == 'INPUT') {
                var id = e.target.getAttribute('data-count-id');
                var div = e.target.parentNode;
                div.classList.toggle("complete");
            }
        });

        TaskManager.prototype.addTask = function (name) {
            var task = new Task(name, this.id++);
            domEl.appendChild(task.render());
        }
    };

    function Task(name, id) {
        this.id = id;
        this.name = name;
        this.isComplete = false;
        Task.prototype.render = function () {
            var mainDiv = document.createElement('div');
            mainDiv.classList.add('task');
            mainDiv.setAttribute('data-id', id);
            var span = document.createElement('span');
            span.innerText = this.name;
            mainDiv.appendChild(span);
            var input = document.createElement('input');
            input.type = 'checkbox';
            input.setAttribute('data-count-id', id);
            mainDiv.appendChild(input);
            return mainDiv;
        }
    }
}());
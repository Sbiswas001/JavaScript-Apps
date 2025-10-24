(() => {
	const STORAGE_KEY = 'todo-list-tasks-v1';

	const form = document.getElementById('todo-form');
	const input = document.getElementById('todo-input');
	const listEl = document.getElementById('todo-list');
	const itemsLeft = document.getElementById('items-left');
	const filters = document.querySelectorAll('.filter');
	const clearCompletedBtn = document.getElementById('clear-completed');

	let tasks = [];
	let filter = 'all';

	function save() {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	}

	function load() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			tasks = raw ? JSON.parse(raw) : [];
		} catch (e) {
			tasks = [];
		}
	}

	function uid() {
		return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
	}

	function render() {
		listEl.innerHTML = '';
		const visible = tasks.filter(t => {
			if (filter === 'active') return !t.completed;
			if (filter === 'completed') return t.completed;
			return true;
		});

		visible.forEach(task => listEl.appendChild(createTaskEl(task)));
		itemsLeft.textContent = tasks.filter(t => !t.completed).length;
	}

	function createTaskEl(task) {
		const li = document.createElement('li');
		li.className = 'todo-item';
		li.dataset.id = task.id;

		const left = document.createElement('div');
		left.className = 'left';

		const chk = document.createElement('input');
		chk.type = 'checkbox';
		chk.checked = !!task.completed;
		chk.addEventListener('change', () => {
			task.completed = chk.checked;
			save();
			render();
		});

		const span = document.createElement('span');
		span.className = 'task-text' + (task.completed ? ' completed' : '');
		span.textContent = task.text;
		span.title = 'Double click to edit';
		span.addEventListener('dblclick', () => enterEditMode(li, task, span));

		left.appendChild(chk);
		left.appendChild(span);

		const actions = document.createElement('div');
		actions.className = 'actions';

		const editBtn = document.createElement('button');
		editBtn.type = 'button';
		editBtn.textContent = 'Edit';
		editBtn.addEventListener('click', () => enterEditMode(li, task, span));

		const delBtn = document.createElement('button');
		delBtn.type = 'button';
		delBtn.textContent = 'Delete';
		delBtn.addEventListener('click', () => {
			tasks = tasks.filter(t => t.id !== task.id);
			save();
			render();
		});

		actions.appendChild(editBtn);
		actions.appendChild(delBtn);

		li.appendChild(left);
		li.appendChild(actions);
		return li;
	}

	function enterEditMode(li, task, span) {
		const input = document.createElement('input');
		input.type = 'text';
		input.className = 'edit-input';
		input.value = task.text;
		span.replaceWith(input);
		input.focus();
		input.select();

		function finish(saveText) {
			if (saveText) {
				const text = input.value.trim();
				if (text) task.text = text;
			}
			save();
			render();
		}

		input.addEventListener('blur', () => finish(true));
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				input.blur();
			} else if (e.key === 'Escape') {
				finish(false);
			}
		});
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const text = input.value.trim();
		if (!text) return;
		const task = { id: uid(), text, completed: false };
		tasks.unshift(task);
		save();
		input.value = '';
		render();
	});

	filters.forEach(btn => btn.addEventListener('click', () => {
		filters.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
		filter = btn.dataset.filter;
		render();
	}));

	clearCompletedBtn.addEventListener('click', () => {
		tasks = tasks.filter(t => !t.completed);
		save();
		render();
	});

	// initial load
	load();
	render();

	// expose for debugging (optional)
	window.__todo = { get tasks() { return tasks; }, save };

})();

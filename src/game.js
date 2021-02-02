import React from 'react';
import next_img from './img/next.png';
import prev_img from './img/prev.png';
import del_img from './img/delete.png';

class Gamecomp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: ['Backlog', 'Todo', 'Ongoing', 'Done'],
            task_obj : {'task1': 1}
        };
        this.addtask = this.addtask.bind(this);
        this.movetask = this.movetask.bind(this);
    }

    addtask(task_name) {
        if (task_name != '') {
            var task_obj = this.state.task_obj;
            task_obj[task_name] = 0;
            this.setState({task_obj: task_obj});
        } else {
            alert("Enter task name!!");
        }
    }

    movetask(task_name, current_index, act) {
        var task_obj = this.state.task_obj;
        for (var i in task_obj) {
            if (i == task_name) {
                if (act == 'next') {
                    task_obj[task_name] = current_index + 1;
                } else if (act == 'prev') {
                    task_obj[task_name] = current_index - 1;
                } else if (act == 'del') {
                    delete task_obj[i];
                }
            }
        }
        this.setState({task_obj: task_obj});
    }
    render() {
        return(
            <div style={{margin: '0px auto', width: '1000px', padding: '10px', backgroundColor: '#fafafa', border: '2px solid #dee2e6', borderRadius: '10px', minHeight: '500px', marginTop: '5px'}}>
                <h4>KANZAN BOARD GAME</h4>
                <Addtask addtask1={this.addtask}  />
                <Stagescomp stage={this.state.stage} task_obj={this.state.task_obj} movetask={this.movetask} />
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}

class Addtask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_val: ''
        };
    }
    keepvalue(task_name) {
        this.setState({task_val: task_name});
    }
    render() {
        return(
            <div style={{marginBottom: '10px'}}>
                <input type="text" name="add_task" placeholder="New task Name" onChange={(e) => this.keepvalue(e.target.value)} />&nbsp;
                <input type="button" name="add_btn" value="Create task" onClick={(e) => this.props.addtask1(this.state.task_val)} />
            </div>
        );
    }
}

class Stagescomp extends React.Component {
    render() {
        var maxStagekey = this.props.stage.length;
        return(
            <div>
                {this.props.stage.map((item, index) => {
                    return <div key={index} style={{width:'220px', float: 'left', marginLeft:'10px'}}>
                        <div style={{padding: '10px', backgroundColor: 'lightblue', textAlign: 'center'}}><b>{item}</b></div>
                        <TaskList key={index} task_obj={this.props.task_obj} stageindex={index} maxStagekey={maxStagekey} movetask={this.props.movetask} />
                    </div>
                })}
            </div>
        );
    }
}

class TaskList extends React.Component {
    render() {
        var stageindex = this.props.stageindex;
        var task_array = [];
        var task_obj = this.props.task_obj;
        for (let i in task_obj) {
            if (stageindex == task_obj[i]) {
                task_array.push(
                    <div key={i} style={{padding: '5px', marginTop: '5px', backgroundColor: 'lightblue'}}>
                        <div style={{float: 'left', width: '98px'}}>{i} </div>

                        <div style={{float: 'right'}}>
                            {(stageindex != 0) ? <span style={{marginLeft: '15px', cursor: 'pointer', top: '4px', position: 'relative'}} onClick={() => this.props.movetask(i, stageindex, 'prev')}><img src={prev_img} width="20" /></span> : ''}                        

                            {(stageindex != (this.props.maxStagekey - 1)) ? <span style={{marginLeft: '15px', cursor: 'pointer', top: '4px', position: 'relative'}} onClick={() => this.props.movetask(i, stageindex, 'next')}><img src={next_img} width="20" /></span> : ''}
                            
                            <span style={{marginLeft: '15px', cursor: 'pointer', top: '4px', position: 'relative'}} onClick={() => this.props.movetask(i, stageindex, 'del')}><img src={del_img} width="20" /></span>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                );
            }
        }
        return(
            <div>{task_array}</div>
        );
    }
}

export default Gamecomp
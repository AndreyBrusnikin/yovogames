<template lang="pug">
    .table-holder
        button(@click="save") Save
        .table-row
            .table-col.head Icon
            .table-col.head Campaign
            .table-col.head Level
            .table-col.head LootID
            .table-col.head LootSubID
            .table-col.head Count
            .table-col.head Action
        .table-row(v-if="index < table.length" v-for="index in tableToShow")
            .table-col
                .table-icon
                    img(:src="table[index].Icon")
            .table-col {{table[index].Campaign}}
            .table-col {{table[index].Level}}
            .flex3
                .table-row
                    .table-col
                        .sub-row(v-for="(itemloot, i) in table[index].Loot")
                            select(v-model="table[index].Loot[i].ID")
                                option(:value="opt.ID" v-for="opt in loot") {{opt.Name}}
                    .table-col
                        .sub-row(v-for="(itemloot, i) in table[index].Loot" )
                            select(v-model="itemloot.SubID" v-if="itemloot.ID == opt.id" v-for="opt in subId")
                                option(:value="subOpt.ID"  v-for="subOpt in opt.data") {{subOpt.Name}}

                    .table-col
                        .sub-row(v-for="(loot, lootInd) in table[index].Loot")
                            input(v-model="table[index].Loot[lootInd].Count" type="number")
                Icon(id="plus" @click.native="addRow(index)")
            .table-col
                .sub-row(v-for="(itemloot, i) in table[index].Loot")
                    Icon(id="delete" @click.native="removeTable(index,i)")
        button(@click="tableToShow += 5") show more
</template>

<script>
    export default {
        name: 'Table',
        inject: ['API_HOST'],
        props: {},
        data: () => ({
            Key: "testKey123",
            table: [],
            loot: [],
            subId: [],
            tableToShow: 5,
            totalTable: 0,
            loading: ''
        }),

        created() {
            this.tableLoad();
            this.lootLoad();

        },
        methods: {
            removeTable(index, i) {
                this.table[index].Loot.splice(i, 1);
            },
            addRow(i){
                this.table[i].Loot.push({Count:0,ID:0,SubID:0})
            },
            save() {
                let data;
                data = {Key: this.Key,Data: this.table};
                return fetch(this.API_HOST + 'test/table_add', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                }).then(response => response.json())
                    .then(json => {
                        console.log(json);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            subIdLoad(id) {
                let data;
                data = {Key: this.Key};
                fetch(this.API_HOST + 'test/loot?subid='+id, {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(json => {
                        this.subId.push({id:id, data: json.Data})
                    })
            },
            tableLoad() {
                let data;
                data = {Key: this.Key};
                fetch(this.API_HOST + 'test/table', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                }).then(response => response.json())
                    .then(json => {
                        this.table = json.Data
                        this.totalTable = this.table.length
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            lootLoad() {
                var data;
                data = {Key: this.Key};
                fetch(this.API_HOST + 'test/loot', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                }).then(response => response.json())
                    .then(json => {
                        this.loot = json.Data
                        for(let i =0; i<this.loot.length; i++){
                            this.subIdLoad(this.loot[i].ID)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        }
    }
</script>
<style scoped lang="scss">

    button{
        margin: 20px 0;
    }
    input{
        width: calc(100% - 6px);
    }
    .icon {
        height: 1em;
        width: 1em;
        fill: black;
        cursor: pointer;
        position: relative;
    }
    .icon-plus{
        display: flex;
        justify-content: center;
        width: 100%;
        border: 1px solid black;
    }
    .table-row {
        display: flex;


    }

    .sub-row {
        height: 20px;
        border: 1px solid black;

        select {
            width: 100%;
        }
    }

    .table-col {
        flex: 1;

        border: 1px solid black;

        &.head {
            justify-content: center;
        }
    }

    .table-holder {
        padding: 50px;
    }
    .flex3{
        flex: 3;
    }
    .table-icon {
        width: 50px;
        height: 50px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
</style>

//META{"name":"GuildCounter","website":"https://metalloriff.github.io/toms-discord-stuff/","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/GuildCounter.plugin.js"}*//

class GuildCounter {
	
    getName() { return "Guild Counter"; }
    getDescription() { return "Displays a guild counter below the online friend counter."; }
    getVersion() { return "1.0.4"; }
    getAuthor() { return "Metalloriff"; }

    load() {}

    start() {

        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
        };

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}
		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
        if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);

	}
	
	onLibLoaded(){
        console.log(this.getName(), "Loading.");

		NeatoLib.Updates.check(this);
        
        this.count = () => {

			let existing = document.getElementById("gc-counter"), count = Object.keys(NeatoLib.Modules.get("getGuilds").getGuilds()).length;
	
			if(existing) existing.innerText = count + " guilds";
			

		}
        
		this.count();

        //NeatoLib.showToast(`[${this.getName()}]: Plugin loaded.`, "success");
        console.log(this.getName(), "loaded.");

        this.ready = true;

        if (this.forceLoadTimeout) {
            clearTimeout(this.forceLoadTimeout);
            this.forceLoadTimeout = null;
            delete this.forceLoadTimeout;
        }
	}
	
    stop() {
		//this.guildsScroller.removeEventListener("DOMNodeInserted", this.count);
		document.getElementById("gc-counter").remove();
	}
	
}
